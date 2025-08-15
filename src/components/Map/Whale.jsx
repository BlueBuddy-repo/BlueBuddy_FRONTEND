import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import Maker from '../../assets/img/map/whale.svg';

const containerStyle = { width: '100%', height: 'calc(100vh - 15rem)' };
const center = { lat: 0, lng: 140 };
const mapStyles = [
  { featureType: 'administrative.country', elementType: 'labels', stylers: [{ visibility: 'on' }] },
  { featureType: 'administrative.locality', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.province', elementType: 'labels', stylers: [{ visibility: 'off' }] },
];

const OCEAN_KEY = 'north_pacific';
const TRAIL_COLOR = '#1e88e5';
const LS_KEY = (key) => `whaleProgress:${key}`;

const toRad = (d) => (d * Math.PI) / 180;
const distKm = (a, b) => {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  let dLng = toRad(b.lng - a.lng);
  if (dLng > Math.PI) dLng -= 2 * Math.PI;
  if (dLng < -Math.PI) dLng += 2 * Math.PI;
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat);
  const s = Math.sin(dLat/2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(s));
};
const lerp = (a, b, t) => a + (b - a) * t;
const lerpLng = (lon1, lon2, t) => {
  let d = lon2 - lon1;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  let lon = lon1 + d * t;
  if (lon > 180) lon -= 360;
  if (lon < -180) lon += 360;
  return lon;
};
const lerpLatLng = (p, q, t) => ({ lat: lerp(p.lat, q.lat, t), lng: lerpLng(p.lng, q.lng, t) });
const bearingDeg = (a, b) => {
  const φ1 = toRad(a.lat), φ2 = toRad(b.lat);
  const λ1 = toRad(a.lng), λ2 = toRad(b.lng);
  const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
};
const buildTrail = (pts, segLen, seg, segKm) => {
  if (!pts?.length || segLen.length === 0) return [];
  if (seg === 0 && (!segLen[0] || segKm === 0)) return [];
  if (seg >= segLen.length) return pts.slice();
  const t = segLen[seg] === 0 ? 1 : segKm / segLen[seg];
  const cur = lerpLatLng(pts[seg], pts[seg + 1], t);
  const arr = pts.slice(0, seg + 1);
  if (t > 0) arr.push(cur);
  return arr.filter((p, i, a) => i === 0 || p.lat !== a[i - 1].lat || p.lng !== a[i - 1].lng);
};

export default function Whale() {
  const mapRef = useRef(null);
  const ptsRef = useRef([]);
  const segLenRef = useRef([]);
  const progRef = useRef({ seg: 0, segKm: 0 });
  const boundsRef = useRef(null);

  const [runner, setRunner] = useState(null);
  const [heading, setHeading] = useState(0);
  const [trail, setTrail] = useState([]);
  const [playing, setPlaying] = useState(true);
  const [speedKmh] = useState(20000);

  const iconRunner = useMemo(() => {
    if (!window.google?.maps) return { url: Maker };
    return { url: Maker, scaledSize: new window.google.maps.Size(36, 36), anchor: new window.google.maps.Point(18, 32) };
  }, []);
  const iconArrow = useMemo(() => {
    if (!window.google?.maps) return null;
    return { path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 4, strokeColor: '#ffffff', strokeWeight: 2, fillColor: TRAIL_COLOR, fillOpacity: 1, rotation: heading };
  }, [heading]);

  const trailOpts = useMemo(() => ({ strokeColor: TRAIL_COLOR, strokeOpacity: 0.95, strokeWeight: 3, geodesic: true }), []);

  const onLoad = (map) => {
    mapRef.current = map;
    map.setOptions({ mapTypeId: 'hybrid', styles: mapStyles, fullscreenControl: false, streetViewControl: false, mapTypeControl: false, gestureHandling: 'greedy', rotateControl: false });
    loadTrack();
  };

  const extractPoints = (geojson) => {
    const out = [];
    const pushLine = (line) => line.forEach(([lng, lat]) => out.push({ lat, lng }));
    const walkGeom = (g) => {
      if (!g) return;
      if (g.type === 'LineString') pushLine(g.coordinates);
      else if (g.type === 'MultiLineString') g.coordinates.forEach(pushLine);
      else if (g.type === 'GeometryCollection') (g.geometries || []).forEach(walkGeom);
    };
    const walkAny = (obj) => {
      if (!obj) return;
      if (obj.type === 'Feature') walkGeom(obj.geometry);
      else if (obj.type === 'FeatureCollection') (obj.features || []).forEach(walkAny);
      else walkGeom(obj);
    };
    walkAny(geojson);
    return out;
  };

  const loadTrack = async () => {
    const map = mapRef.current;
    if (!map) return;

    const url = `${process.env.REACT_APP_URL}/tracks/${OCEAN_KEY}/mega_natural_3h_simplified.geojson`;
    let geojson;
    try {
      const r = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      geojson = await r.json();
    } catch {
      return;
    }

    const pts = extractPoints(geojson);
    if (pts.length < 2) return;

    ptsRef.current = pts;
    segLenRef.current = [];
    for (let i = 0; i < pts.length - 1; i++) segLenRef.current.push(distKm(pts[i], pts[i + 1]));

    const saved = (() => { try { return JSON.parse(localStorage.getItem(LS_KEY(OCEAN_KEY)) || 'null'); } catch { return null; } })();
    let seg = 0, segKm = 0;
    if (saved && Number.isInteger(saved.seg) && typeof saved.segKm === 'number') {
      seg = Math.max(0, Math.min(saved.seg, segLenRef.current.length - 1));
      segKm = Math.max(0, Math.min(saved.segKm, segLenRef.current[seg]));
    }
    progRef.current = { seg, segKm };

    const t = segLenRef.current[seg] === 0 ? 0 : segKm / segLenRef.current[seg];
    const cur = lerpLatLng(pts[seg], pts[seg + 1], t);
    const dir = bearingDeg(pts[seg], pts[seg + 1]);

    setRunner(cur);
    setHeading(dir);
    setTrail(buildTrail(pts, segLenRef.current, seg, segKm));

    const b = new window.google.maps.LatLngBounds();
    for (const p of pts) b.extend(new window.google.maps.LatLng(p.lat, p.lng));
    boundsRef.current = b;

    map.setCenter(cur);
    map.setZoom(6);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing) return;
    const pts = ptsRef.current;
    const segLen = segLenRef.current;
    if (!pts?.length || !segLen?.length) return;

    let { seg, segKm } = progRef.current;
    let last = performance.now();
    let raf = 0;

    const tick = (now) => {
      const dtMs = now - last;
      last = now;

      let remain = (speedKmh / 3600000) * dtMs;
      while (remain > 0 && seg < segLen.length) {
        const left = segLen[seg] - segKm;
        if (remain < left) { segKm += remain; remain = 0; }
        else { remain -= left; seg += 1; segKm = 0; }
      }

      if (seg >= segLen.length) {
        setRunner(pts[pts.length - 1]);
        setHeading(bearingDeg(pts[pts.length - 2], pts[pts.length - 1]));
        setTrail(pts.slice());
        localStorage.setItem(LS_KEY(OCEAN_KEY), JSON.stringify({ seg: segLen.length - 1, segKm: segLen[segLen.length - 1] }));
        return;
      }

      const t = segLen[seg] === 0 ? 1 : segKm / segLen[seg];
      const cur = lerpLatLng(pts[seg], pts[seg + 1], t);
      const dir = bearingDeg(pts[seg], pts[seg + 1]);
      setRunner(cur);
      setHeading(dir);
      setTrail(buildTrail(pts, segLen, seg, segKm));

      progRef.current = { seg, segKm };
      localStorage.setItem(LS_KEY(OCEAN_KEY), JSON.stringify({ seg, segKm }));

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, speedKmh]);

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2} onLoad={onLoad}>
      {trail.length >= 2 && <Polyline path={trail} options={trailOpts} />}
      {runner && <Marker position={runner} icon={iconRunner} />}
      {runner && iconArrow && <Marker position={runner} icon={iconArrow} zIndex={9999} />}
    </GoogleMap>
  );
}