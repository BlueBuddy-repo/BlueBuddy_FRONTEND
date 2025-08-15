import React from 'react'
import { Link } from 'react-router-dom'
import Whale from '../../assets/img/icon/whale.svg'
import Spotlight from '../../assets/img/main/spotlight.png';

const Newpet = () => {
  return (
    <div className='newpet_wrap contents'>
      <img src={Whale} alt=""  className='animal'/>
      <img src={Spotlight} alt="" className='spot'/>
      <div className="name">하와이 혹등고래</div>
      <Link to = '/book'>도감으로 이동</Link>
    </div>
  )
}

export default Newpet
