import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Whale from '../../assets/img/icon/whale.svg';
import Spotlight from '../../assets/img/main/spotlight.png';

const Newpet = () => {
  const { spotId } = useParams(); // URL의 spotId 파라미터 받기
  const API = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!spotId) return;

    axios
      .get(`${API}/open?spotId=${spotId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('✅ 오픈 성공:', res.data);
      })
      .catch((err) => {
        console.error('❌ 오픈 API 실패:', err);
      });
  }, [spotId, API, token]);

  return (
    <div className="newpet_wrap contents">
      <img src={Whale} alt="" className="animal" />
      <img src={Spotlight} alt="" className="spot" />
      <div className="name">하와이 혹등고래</div>
      <Link to="/book">도감으로 이동</Link>
    </div>
  );
};

export default Newpet;
