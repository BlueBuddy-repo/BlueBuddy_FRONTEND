import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, PolylineF, MarkerF } from '@react-google-maps/api';
import turtleIcon from '../../assets/img/map/turtle.svg';

const containerStyle = { width: '100%', height: 'calc(100vh - 15rem)' };

function interpolatePath(points, stepsPerSegment = 30) {
  const result = [];
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];
    for (let step = 0; step < stepsPerSegment; step++) {
      const t = step / stepsPerSegment;
      result.push({
        lat: start.lat + (end.lat - start.lat) * t,
        lng: start.lng + (end.lng - start.lng) * t
      });
    }
  }
  result.push(points[points.length - 1]);
  return result;
}

const Turtle = () => {
  const API_KEY = process.env.REACT_APP_TURTLE_API_KEY; 
  const BASE_URL = `https://apis.data.go.kr/B553482/SeaTurtleRouteService/getSeaTurtleRoute`;

  const [coords, setCoords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(
    parseInt(localStorage.getItem('turtleIndex') || '0', 10)
  );

  useEffect(() => {
    const fetchAllPages = async () => {
      try {
        const firstURL = `${BASE_URL}?serviceKey=${API_KEY}&pttId=152987&resultType=json&numOfRows=30&pageNo=1`;
        const firstRes = await axios.get(firstURL);

        const pageCount = firstRes.data?.response?.header?.pageCount || 1;
        let allItems = firstRes.data?.response?.body?.items?.item || [];

        if (pageCount > 1) {
          const requests = [];
          for (let page = 2; page <= pageCount; page++) {
            const pageURL = `${BASE_URL}?serviceKey=${API_KEY}&pttId=152987&resultType=json&numOfRows=30&pageNo=${page}`;
            requests.push(axios.get(pageURL));
          }
          const results = await Promise.all(requests);
          results.forEach(res => {
            const items = res.data?.response?.body?.items?.item || [];
            allItems = allItems.concat(items);
          });
        }

        const sorted = allItems.sort(
          (a, b) => new Date(a.obsrTm) - new Date(b.obsrTm)
        );
        const mapped = sorted.map(it => ({
          lat: parseFloat(it.obsrLat),
          lng: parseFloat(it.obsrLon)
        }));

        const smoothCoords = interpolatePath(mapped, 30);
        setCoords(smoothCoords);
      } catch (error) {
        console.error('API 호출 실패:', error);
      }
    };

    fetchAllPages();
  }, []);

  useEffect(() => {
    if (coords.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev < coords.length - 1 ? prev + 1 : prev;
        localStorage.setItem('turtleIndex', next);
        return next;
      });
    }, 3000); 
    return () => clearInterval(timer);
  }, [coords]);

  const mapStyles = [
    { featureType: 'administrative.country', elementType: 'labels', stylers: [{ visibility: 'on' }] },
    { featureType: 'administrative.locality', elementType: 'labels', stylers: [{ visibility: 'off' }] },
    { featureType: 'administrative.province', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  ];

  return (
    <div className='turtle_wrap'>
      {coords.length > 0 && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coords[currentIndex]}
          zoom={5}
          options={{
            mapTypeId: 'hybrid',
            styles: mapStyles,
            minZoom: 2,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            gestureHandling: 'greedy',
            rotateControl: false
          }}
        >

          <PolylineF
            path={coords.slice(0, currentIndex + 1)}
            options={{
              strokeColor: '#00AEEF',
              strokeWeight: 2,
              icons: [
                {
                  icon: {
                    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 2,
                    strokeColor: '#00AEEF'
                  },
                  offset: '100%',
                  repeat: '100px'
                }
              ]
            }}
          />

          <MarkerF position={coords[currentIndex]} icon={turtleIcon} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Turtle;
