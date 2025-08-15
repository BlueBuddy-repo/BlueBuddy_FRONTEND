import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { GoogleMap, HeatmapLayer } from '@react-google-maps/api'
import Icon from '../../assets/img/map/unknown.svg'
import Markers from './Marker'
import Modal from './Modal'



const mapStyles = [
    { featureType: 'administrative.country', elementType: 'labels', stylers: [{ visibility: 'on' }] },
    { featureType: 'administrative.locality', elementType: 'labels', stylers: [{ visibility: 'off' }] },
    { featureType: 'administrative.province', elementType: 'labels', stylers: [{ visibility: 'off' }] },
]


const fixLon = (lon) => (lon > 180 ? lon - 360 : lon)

const LEVEL_WEIGHT = { 1: 1, 2: 3, 3: 6, 4: 10 }
const HEATMAP_GRADIENT = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 0.6)',
    'rgba(0, 191, 255, 0.7)',
    'rgba(0, 127, 255, 0.8)',
    'rgba(0, 63, 255, 0.85)',
    'rgba(0, 0, 255, 0.9)',
    'rgba(0, 0, 223, 0.95)',
    'rgba(63, 0, 191, 0.95)',
    'rgba(127, 0, 127, 0.97)',
    'rgba(191, 0, 63, 0.98)',
    'rgba(255, 0, 0, 1.0)',
]


const OCEAN_STEPS = [
    {
        name: '대서양 (North Atlantic)',
        points: { lat: 20, lng: -30 }
    },
    {
        name: '태평양 (North Pacific)',
        points: { lat: 20, lng: -150 }
    },
    {
        name: '인도양 (North Indian Ocean)',
        points: { lat: 15, lng: 70 }
    },
    {
        name: '북극해 (Arctic Ocean)',
        points: { lat: 75, lng: -20 }
    },
]


export default function Temp() {
    const [info, setInfo] = useState(false)
    const [points, setPoints] = useState([])
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [step, setStep] = useState(1)
    const containerStyle = { width: '100%', height: 'calc(100vh - 15rem)' }
    const API = process.env.REACT_APP_API_URL


    useEffect(() => {
        axios
            .get(`${API}/api/seatemp`)
            .then((res) => {
                const raw = res?.data?.data ?? []
                const arr = Array.isArray(raw) ? raw : []
                const normalized = arr
                    .map((p) => ({
                        lat: Number(p.lat),
                        lng: fixLon(Number(p.lng)),
                        level: Number(p.level),
                        time: String(p.time),
                    }))
                    .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng) && [1, 2, 3, 4].includes(p.level))
                setPoints(normalized)
            })
            .catch((err) => console.error('seatemp 로드 실패 :', err))
    }, [API])


    const heatmapData = useMemo(() => {
        if (!window.google || !points.length) return []
        return points.map((p) => ({
            location: new window.google.maps.LatLng(p.lat, p.lng),
            weight: LEVEL_WEIGHT[p.level] ?? 1,
        }))
    }, [points])


    const oceanMarkers = useMemo(() => {
        const S = Math.max(1, Math.min(step, OCEAN_STEPS.length))
        const merged = []
        for (let i = 0; i < S; i++) {
            const ocean = OCEAN_STEPS[i]
            const pts = Array.isArray(ocean.points) ? ocean.points : [ocean.points]
            pts.forEach((p) => merged.push({ ...p, ocean: ocean.name, order: i + 1 }))
        }
        return merged
    }, [step])


    return (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: 20, lng: 0 }}
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
            >

                {heatmapData.length > 0 && (
                    <HeatmapLayer
                        data={heatmapData}
                        options={{ radius: 22, dissipating: true, opacity: 0.65, gradient: HEATMAP_GRADIENT, maxIntensity: 15 }}
                    />
                )}

                <Markers
                    step={step}
                    iconUrl={Icon}
                    onSelect={(pos) => {
                        setSelected(pos)
                        setOpen(true)
                    }}
                />
                {open && <Modal setOpen={setOpen} selected={selected} />}


                <div className="temp_info" onClick={() => setInfo((v) => !v)}>
                    ?
                    {info && (
                        <div className="info_wrap">
                            이상수온이란?
                            이상수온은 지구온난화, 엘니뇨, 태양열 등으로 평년에 비하여 수온이 올라가는 현상을 뜻합니다 .
                            BlueBuddy는 한달기준으로 지도를 업데이트 합니다 .
                        </div>
                    )}
                </div>
            </GoogleMap>




        </>
    )
}
