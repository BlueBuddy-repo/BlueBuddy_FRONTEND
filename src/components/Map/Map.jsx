import React from 'react'
import Plastic from './Plastic'

const Map = () => {
  return (
    <div className='map_wrap contents'>
      <div className="map_btn">
        지도
      </div>
      <div className="map_list">
        <div className="pet">마이펫 지도</div>
        <div className="rad">방사능 지도</div>
        <div className="plas">미세 플라스틱 지도</div>
      </div>

      <div className="map">
        <Plastic />
      </div>

    </div>
  )
}

export default Map
