import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 15rem)'
}

const center = {
    lat: 37.5665,
    lng: 126.9780
}

const mapStyles = [
    {
        featureType: "administrative.country",
        elementType: "labels",
        stylers: [{ visibility: "on" }]
    },
    {
        featureType: "administrative.locality",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
    },
    {
        featureType: "administrative.province",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
    }
]


const Plastic = () => {
    return (
        <div>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                language="en"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={2}
                    options={{
                        mapTypeId: 'hybrid',
                        styles: mapStyles,
                        fullscreenControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        gestureHandling: "greedy",
                        rotateControl: false,
                        restriction: {
                            latLngBounds: {
                                north: 85,
                                south: -85,
                                west: -Infinity,
                                east: Infinity
                            },
                            strictBounds: true
                        }
                    }}
                >
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default Plastic
