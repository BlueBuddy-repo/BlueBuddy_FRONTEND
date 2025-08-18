import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Spotlight from '../../assets/img/main/spotlight.png';

const Newpet = () => {
  const { spotId } = useParams();
  const API = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [petData, setPetData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!spotId) return;

    axios
      .post(
        `${API}/open/${spotId}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log('오픈 성공:', res.data);
        setPetData(res.data);
        setErrorMsg(null);
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          console.warn('이미 오픈된 펫이에요.');

        } else {
          console.error('오픈 API 실패:', err);
        }
      });
  }, [spotId, API, token]);

  return (
    <div className="newpet_wrap contents">
      {petData && (Array.isArray(petData) ? petData.length > 0 : true) ? (
        <>
          <img
            src={`${API}/${Array.isArray(petData) ? petData[0].imageUrl : petData.imageUrl}`}
            alt=""
            className="animal"
          />
          <img src={Spotlight} alt="" className="spot" />
          <div className="name">
            {Array.isArray(petData) ? petData[0].name : petData.name}
          </div>
        </>
      ) : (
        <div className="loading">
          {errorMsg ? errorMsg : '펫 데이터를 불러오는 중…'}
        </div>
      )}

      <Link to="/book">도감으로 이동</Link>
    </div>
  );
};

export default Newpet;
