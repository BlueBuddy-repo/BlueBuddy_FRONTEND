import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Polygon from '../../assets/img/map/Polygon.svg';
import { useNavigate } from 'react-router-dom';

const Modal = ({ setOpen, spotId, completedCount, open }) => {
  const [totalCount, setTotalCount] = useState(0);
  const [creatureList, setCreatureList] = useState([]); 
  const API = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (open && spotId) {
      (async () => {
        try {
          const missionRes = await axios.get(`${API}/getMissionNum?spotId=${spotId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (missionRes.data?.success) {
            setTotalCount(missionRes.data.data);
          }
          const creatureRes = await axios.get(`${API}/sea-creatures/habitat?spotId=${spotId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (creatureRes.data?.success && Array.isArray(creatureRes.data.data)) {
            setCreatureList(creatureRes.data.data.map(c => c.creatureName)); 
          }
        } catch (err) {
          console.error('Modal API 호출 실패:', err);
        }
      })();
    }
  }, [open, spotId, API, token]);


  const gotoZero = () => {
    navigate('/zerowaste');
  };

  return (
    <div className="modal_wrap">
      <img src={Polygon} alt="" />

      <div className="wrap">
        <div className="close" onClick={() => setOpen(false)}>X</div>
        <div className="title">
          오염된 지역 <p>{completedCount}/{totalCount}</p>
        </div>
        <div className="text">
          <p>
            <span className="blue">제로웨이스트 행동</span>을 하고
          </p>
          <span>새로운 생물 카드를 획득하세요!</span>
        </div>
        <div className="btn" onClick={gotoZero}>
          제로웨이스트 인증하기
        </div>

        <div className="info">
          자주출몰하는 동물
          <div className="animal">
            {creatureList.length > 0 ? creatureList.join(', ') : ' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
