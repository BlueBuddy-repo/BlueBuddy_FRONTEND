import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Turtle from './Turtle';
import Whale from './Whale';

const API = process.env.REACT_APP_API_URL;

const Animal = () => {
  const [mypet, setMypet] = useState(null);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`${API}/user-creatures/getMyPet`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data?.success && res.data.data?.creatureId) {
          const petType = res.data.data.creatureId === 1 ? 'whale' : 'turtle';
          setMypet(petType);
        } else {
          setMypet('turtle'); 
        }
      } catch (err) {
        console.error('펫 정보 불러오기 실패:', err);
        setMypet('turtle'); 
      }
    };

    fetchPet();
  }, [token]);

  if (!mypet) return <div>로딩중...</div>;

  return (
    <div className='animal_wrap contents'>
      {mypet === 'turtle' && <Turtle />}
      {mypet === 'whale' && <Whale />}
    </div>
  );
};

export default Animal;
