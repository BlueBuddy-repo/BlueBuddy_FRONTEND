import React, { useEffect, useState } from 'react';
import axios from 'axios';
import waveBox from '../../assets/img/home/waveBox.png';
import wave from '../../assets/img/home/wave.png';
import balloon from '../../assets/img/home/speech_balloon.png';
import heart from '../../assets/img/home/heart.png';

const Home = () => {

  const [petName, setPetName] = useState('');
  const [petImage, setPetImage] = useState('');
  const [waveCount, setWaveCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
       try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('토큰이 없습니다. 로그인 후 이용하세요.');
          return;
        }

        const [petRes, waveRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/user-creatures/getMyPet`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${process.env.REACT_APP_API_URL}/wave/getWave`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setPetName(petRes.data.data.petName);
        setPetImage(petRes.data.data.petImage);

        setWaveCount(waveRes.data.data);

      } catch (err) {
        console.error('데이터 불러오기 실패:', err);
      }
    };

    fetchData();
  }, [token]);

  

  return (
    <div className='home_wrap contents'>
      <div className="wave_box">
        <img className="img" src={waveBox} alt="wave" />
        <div className="pet_name">{petName}</div>
        <div className="wave_index">
          <img className="wave_icon" src={wave} alt="물결" />
          <span>{waveCount}</span>
        </div>      
      </div>

      <div className='creature'>        
        {petImage && <img className="img" src={petImage} alt="creature" />}
        <img className="heart" src={heart} alt="heart" />
      </div>
      <div className='balloon'>
        <img className="img" src={balloon} alt="balloon" />
        <div className='text'>오늘도 방문해줘서 고마워</div>
      </div>
    </div>
  )
}

export default Home
