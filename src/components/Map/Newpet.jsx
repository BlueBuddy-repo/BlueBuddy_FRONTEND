import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Whale from '../../assets/img/icon/whale.svg';
import Spotlight from '../../assets/img/main/spotlight.png';

const Newpet = () => {
  const { spotId } = useParams(); 
  const API = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [petData, setPetData] = useState(null);

  useEffect(() => {
    if (!spotId) return;

    const fetchPetData = async () => {
      try {
        const res = await axios.post(
          `${API}/open/${spotId}`,
          {}, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('오픈 성공:', res.data);
        setPetData(res.data.data);
      } catch (err) {
        console.error('오픈 API 실패:', err);
      }
    };

    fetchPetData();
  }, [spotId, API, token]);

  console.log(petData);

  return (
    <div className="newpet_wrap contents">
      {petData ? (
        <>
          <img src={`${API}/${petData.imageUrl}`} alt="" className="animal" />
          <img src={Spotlight} alt="" className="spot" />
          <div className="name">{petData.name}</div>
        </>
      ) : (
        <div className="loading">불러오는 중…</div>
      )}

      <Link to="/book">도감으로 이동</Link>
    </div>
  );
};

export default Newpet;
