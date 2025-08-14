import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cardImage from '../../assets/img/collection/card.png';

const CreatureBook  = () => {

    const totalCount = 12
    const token = localStorage.getItem('token');
    const API = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const [creatures, setCreatures] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/user-creatures/my`, {
        headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
        if (res.data.success) {
            setCreatures(res.data.data);
            setError(null);
        } else {
            console.error('데이터를 불러오지 못했습니다.');
        }
        })
        .catch(err => {
        console.error('API 호출 실패:', err.message);
        setCreatures([]);
        })
        .finally(() => {
            setLoading(false);
        });
        }, [token]);

        const displayList = loading 
        ? Array(totalCount).fill(null) 
        : (() => {
            const map = new Map();
            creatures.forEach(c => map.set(c.displayOrder, c));
            return Array.from({ length: totalCount }, (_, i) => map.get(i + 1) || null);
            })();

        const cards = displayList.map((creature, index) => (
            <div key={index} className="card"
            onClick={() => {
                if (creature) {
                navigate(`creature/${creature.creatureId}`);
                }
            }}
            style={{ cursor: creature ? 'pointer' : 'default' }}
            >
                
            <img

            src={creature ? `${API}/${creature.imageUrl}` : cardImage }
            alt={creature ? `creature-${creature.creatureId}` : 'default card'}

            />
        </div>
        ));

    if (error) return <div>{error}</div>;


    return (
        <div className='creatureBook_wrap contents'>
        <div className='creature-grid'>{cards}</div>
        </div>
    )
}

export default CreatureBook 


