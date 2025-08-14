import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { GoogleMap, Circle, InfoWindow } from '@react-google-maps/api'

const containerStyle = { width: '100%', height: 'calc(100vh - 15rem)' }
const fallbackCenter = { lat: 0, lng: 0 }

const mapStyles = [
  { featureType: 'administrative.country', elementType: 'labels', stylers: [{ visibility: 'on' }] },
  { featureType: 'administrative.locality', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.province', elementType: 'labels', stylers: [{ visibility: 'off' }] },
]

const fixLon = (lon) => (lon > 180 ? lon - 360 : lon)


const cellCenter = ({ latMin, latMax, lonMin, lonMax }) => ({
  lat: (Number(latMin) + Number(latMax)) / 2,
  lng: fixLon((Number(lonMin) + Number(lonMax)) / 2),
})


function cellRadiusMeters({ latMin, latMax, lonMin, lonMax }) {
  const R_LAT_M = 111_000 
  const latC = (Number(latMin) + Number(latMax)) / 2
  const latSpan = Math.abs(Number(latMax) - Number(latMin))
  const lonSpan = Math.abs(Number(lonMax) - Number(lonMin))
  const widthM = lonSpan * R_LAT_M * Math.cos((latC * Math.PI) / 180)
  const heightM = latSpan * R_LAT_M
  return Math.max(5000, Math.min(widthM, heightM) * 0.45)
}

function colorFor(value, maxValue) {
  if (!maxValue || maxValue <= 0) return 'rgba(0, 0, 255, 0.6)'
  const t = Math.max(0, Math.min(1, value / maxValue))
  const hue = 220 * (1 - t)
  return `hsla(${hue}, 85%, 55%, 0.55)`
}

export default function Species() {
  const [cells, setCells] = useState([])
  const [selected, setSelected] = useState(null) 
  const [mapCenter, setMapCenter] = useState(fallbackCenter)
  const mapRef = useRef(null)
  const API = process.env.REACT_APP_API_URL

  useEffect(() => {
    axios
      .get(`${API}/api/species`)
      .then((res) => {
        const arr = Array.isArray(res?.data) ? res.data : []

        const normalized = arr.map((c) => ({
          id: Number(c.id),
          latMin: Number(c.latMin),
          latMax: Number(c.latMax),
          lonMin: fixLon(Number(c.lonMin)),
          lonMax: fixLon(Number(c.lonMax)),
          speciesCount: Number(c.speciesCount) || 0,
          updatedAt: String(c.updatedAt ?? ''),
        }))
        setCells(normalized)

        if (normalized.length) {
          const map = mapRef.current
          if (map && window.google) {
            const bounds = new window.google.maps.LatLngBounds()
            normalized.forEach((cell) => {
              const { lat, lng } = cellCenter(cell)
              bounds.extend(new window.google.maps.LatLng(lat, lng))
            })
            map.fitBounds(bounds, 60)
          } else {
            const first = cellCenter(normalized[0])
            setMapCenter(first)
          }
        }
      })
      .catch((err) => console.error('species 로드 실패 :', err))
  }, [API])

  const maxCount = useMemo(
    () => cells.reduce((m, c) => Math.max(m, c.speciesCount || 0), 0),
    [cells]
  )

  const circles = useMemo(
    () =>
      cells.map((cell) => {
        const center = cellCenter(cell)
        const radius = cellRadiusMeters(cell)
        const fillColor = colorFor(cell.speciesCount, maxCount)
        return { center, radius, fillColor, cell }
      }),
    [cells, maxCount]
  )

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={2}
      options={{
        mapTypeId: 'hybrid',
        styles: mapStyles,
        minZoom: 2,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        gestureHandling: 'greedy',
        rotateControl: false,
       
      }}
      onLoad={(map) => {
        mapRef.current = map
        if (cells.length && window.google) {
          const bounds = new window.google.maps.LatLngBounds()
          cells.forEach((cell) => {
            const { lat, lng } = cellCenter(cell)
            bounds.extend(new window.google.maps.LatLng(lat, lng))
          })
          map.fitBounds(bounds, 60)
        }
      }}
    >
      {circles.map(({ center, radius, fillColor, cell }) => (
        <Circle
          key={cell.id}
          center={center}
          radius={radius}
          options={{
            fillColor,
            fillOpacity: 0.6,
            strokeColor: 'rgba(255,255,255,0)',
            strokeOpacity: 0.9,
            strokeWeight: 1,
            clickable: true,
          }}
          onClick={() => setSelected({ center, cell })}
        />
      ))}

      {selected && (
        <InfoWindow
          position={selected.center}
          onCloseClick={() => setSelected(null)}
        >
          <div className='species_point'>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>생물다양성</div>
            <div style={{ fontSize: 13, lineHeight: 1.4 }}>
              <div>
                위도 : {selected.cell.latMin}° ~ {selected.cell.latMax}°
              </div>
              <div>
                경도 : {selected.cell.lonMin}° ~ {selected.cell.lonMax}°
              </div>
              <div>다양성 레벨: <b>{selected.cell.speciesCount}</b></div>
             
            </div>
          </div>
        </InfoWindow>
      )}

    
    </GoogleMap>
  )
}
