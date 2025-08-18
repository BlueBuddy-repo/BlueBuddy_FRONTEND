import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { GoogleMap, HeatmapLayer } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/img/map/unknown.svg';
import OpenIcon from '../../assets/img/map/known.svg';
import Markers from './Marker';
import Modal from './Modal';

const mapStyles = [
    { featureType: 'administrative.country', elementType: 'labels', stylers: [{ visibility: 'on' }] },
    { featureType: 'administrative.locality', elementType: 'labels', stylers: [{ visibility: 'off' }] },
    { featureType: 'administrative.province', elementType: 'labels', stylers: [{ visibility: 'off' }] },
];

const fixLon = (lon) => (lon > 180 ? lon - 360 : lon);

const LEVEL_WEIGHT = { 1: 1, 2: 3, 3: 6, 4: 10 };
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
];

export default function Temp({ isLoaded }) {
   
    const [info, setInfo] = useState(false);
    const [points, setPoints] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [missionSpots, setMissionSpots] = useState([]);
    const [notOpenedSpots, setNotOpenedSpots] = useState([]);

    const navigate = useNavigate();

    const containerStyle = { width: '100%', height: 'calc(100vh - 15rem)' };
    const API = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios
            .get(`${API}/api/seatemp`)
            .then((res) => {
                const raw = res?.data?.data ?? [];
                const arr = Array.isArray(raw) ? raw : [];
                const normalized = arr
                    .map((p) => ({
                        lat: Number(p.lat),
                        lng: fixLon(Number(p.lng)),
                        level: Number(p.level),
                        time: String(p.time),
                    }))
                    .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng) && [1, 2, 3, 4].includes(p.level));
                setPoints(normalized);
            })
            .catch((err) => console.error('seatemp 로드 실패 :', err));
    }, [API]);


    useEffect(() => {
        axios
            .get(`${API}/spotList`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const data = res?.data.data;
                const activeSpots = data.filter((spot) => spot.isCompleted === false);
                const notOpened = data.filter(
                    (spot) => spot.isCompleted === true && spot.isOpened === false
                );
                setMissionSpots(activeSpots);
                setNotOpenedSpots(notOpened);

            })
            .catch((err) => console.error('spotList 로드 실패:', err));
    }, [API, token]);

    const heatmapData = useMemo(() => {
        if (!window.google || !points.length) return [];
        return points.map((p) => ({
            location: new window.google.maps.LatLng(p.lat, p.lng),
            weight: LEVEL_WEIGHT[p.level] ?? 1,
        }));
    }, [points]);
    const defaultCenter = { lat: 0, lng: -160 }

    return (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={
                    missionSpots.length > 0 && missionSpots[0].latitude && missionSpots[0].longitude
                        ? { lat: Number(missionSpots[0].latitude), lng: Number(missionSpots[0].longitude) }
                        : defaultCenter
                }
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
                        options={{
                            radius: 22,
                            dissipating: true,
                            opacity: 0.65,
                            gradient: HEATMAP_GRADIENT,
                            maxIntensity: 15,
                        }}
                    />
                )}

                <Markers
                className= "dkdf"
                    spots={missionSpots}
                    iconUrl={Icon}
                    onSelect={(spot) => {
                        setSelected(spot);
                        setOpen(true);
                    }}
                />


                {notOpenedSpots.length > 0 && (
                    <Markers
                        spots={notOpenedSpots}
                        iconUrl={OpenIcon}
                        onSelect={(spot) => {
                            navigate(`/newpet/${spot.spotId}`);
                        }}
                    />
                )}


                {open && missionSpots.length > 0 && (
                    <Modal
                        setOpen={setOpen}
                        open={open}
                        spotId={missionSpots[0].spotId}
                        completedCount={missionSpots[0].missionCount}

                    />
                )}


                <div className="temp_info" onClick={() => setInfo((v) => !v)}>
                    ?
                    {info && (
                        <div className="info_wrap">
                            이상수온이란?
                            이상수온은 지구온난화, 엘니뇨, 태양열 등으로 평년에 비하여 수온이 올라가는 현상을 뜻합니다.
                            BlueBuddy는 한달기준으로 지도를 업데이트 합니다.
                        </div>
                    )}
                </div>
            </GoogleMap>
        </>
    );
}
