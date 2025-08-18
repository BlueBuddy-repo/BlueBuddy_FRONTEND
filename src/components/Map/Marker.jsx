import { Marker } from '@react-google-maps/api'

export default function Markers({ spots = [], iconUrl, onSelect }) {
  const icon =
    window.google?.maps
      ? {
          url: iconUrl,
          scaledSize: new window.google.maps.Size(36, 36),
          anchor: new window.google.maps.Point(18, 32),
        }
      : iconUrl

  const spot = spots[0]

  if (!spot || !spot.latitude || !spot.longitude) return null

  return (
    <Marker
      key={`spot-${spot.spotId}`}
      position={{ lat: Number(spot.latitude), lng: Number(spot.longitude) }}
      onClick={() => onSelect?.(spot)}
      icon={icon}
      title={`${spot.spotName ?? '미션 스팟'} · N ${spot.latitude}°, ${spot.longitude >= 0 ? 'E' : 'W'} ${Math.abs(
        spot.longitude
      )}°`}
    />
  )
}
