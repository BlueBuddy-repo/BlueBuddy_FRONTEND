import { useEffect, useState } from 'react'
import { Marker } from '@react-google-maps/api'

export default function Markers({ spots = [], iconUrl, onSelect }) {
  const [spot, setSpot] = useState(null)

  useEffect(() => {
    if (spots.length > 0) {
      setSpot(spots[0])   // 데이터 들어오면 세팅
    }
  }, [spots])

  const icon =
    window.google?.maps
      ? {
          url: iconUrl,
          scaledSize: new window.google.maps.Size(36, 36),
          anchor: new window.google.maps.Point(18, 32),
        }
      : iconUrl

  if (!spot) {
    return <div>스팟 기다리는 중…</div> // spot 올 때까지 "대기" 느낌
  }

  return (
    <Marker
      key={`spot-${spot.spotId}`}
      position={{ lat: Number(spot.latitude), lng: Number(spot.longitude) }}
      onClick={() => onSelect?.(spot)}
      icon={icon}
      title={`${spot.spotName ?? '미션 스팟'} · N ${spot.latitude}°, ${
        spot.longitude >= 0 ? 'E' : 'W'
      } ${Math.abs(spot.longitude)}°`}
    />
  )
}
