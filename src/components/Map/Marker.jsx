import { Marker } from '@react-google-maps/api'
import { buildOceanMarkers } from './Ocean'

export default function Markers({ step = 1, iconUrl, onSelect }) {
  const markers = buildOceanMarkers(step)

  const icon =
    window.google?.maps
      ? {
          url: iconUrl,
          scaledSize: new window.google.maps.Size(36, 36),
          anchor: new window.google.maps.Point(18, 32),
        }
      : iconUrl 

  return markers.map((pos, idx) => (
    <Marker
      key={`${pos.ocean}-${pos.lat},${pos.lng},${idx}`}
      position={{ lat: pos.lat, lng: pos.lng }}
      onClick={() => onSelect?.(pos)}
      icon={icon}
      title={`${pos.ocean} · N ${pos.lat}°, ${pos.lng >= 0 ? 'E' : 'W'} ${Math.abs(pos.lng)}°`}
    />
  ))
}
