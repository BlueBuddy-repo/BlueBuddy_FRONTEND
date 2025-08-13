import React from 'react'
import waveBox from '../../assets/img/home/waveBox.png';
import wave from '../../assets/img/home/wave.png';
import balloon from '../../assets/img/home/speech_balloon.png';
import shark from '../../assets/img/home/shark.png';
import heart from '../../assets/img/home/heart.png';

const Home = () => {
  return (
    <div className='home_wrap contents'>
      <div className="wave_box">
        <img className="img" src={waveBox} alt="wave" />
        <div className="pet_name">블루</div>
        <div className="wave_index">
          <img className="wave_icon" src={wave} alt="물결" />
          <span>325</span>
        </div>      
      </div>

      <div className='creature'>        
        <img className="img" src={shark} alt="creature" />
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
