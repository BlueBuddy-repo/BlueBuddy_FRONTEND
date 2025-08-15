import React, { useState, useEffect } from 'react';
import Turtle from './Turtle';
import Whale from './Whale';

const Animal = () => {
  const [mypet, setMypet] = useState('whale');

  useEffect(() => {
    // 📌 여기서 서버나 로컬스토리지에서 mypet 값 불러오기
    // 예: localStorage에서 불러오기
    const savedPet = localStorage.getItem('mypet') || 'whale'; // 기본값 turtle
    setMypet(savedPet);
  }, []);

  return (
    <div className='animal_wrap contents'>
      {mypet === 'turtle' && <Turtle />}
      {mypet === 'whale' && <Whale />}
    </div>
  );
};

export default Animal;
