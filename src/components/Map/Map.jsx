import React, { useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import Temp from './Temp';
import Species from './Species';
import Animal from './Animal';
  const MAP_LIBRARIES = ['visualization'];
  
const Map = () => {
  const [onmap, setOnmap] = useState('temp');
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: MAP_LIBRARIES,
  });

  const handleClick = (key) => setOnmap(key);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  if (loadError)
    return <div style={{ padding: 16, color: '#c00' }}>지도 스크립트 로드 실패 지요 ∼</div>;
  if (!isLoaded) return <div style={{ padding: 16 }}>지도를 불러오는 중 …</div>;

  return (
    <div className='map_wrap contents'>
      <div className="map_btn" onClick={toggleMenu}>
        지도
      </div>

      {isMenuOpen && (
        <div className="map_list">
          <div
            className={`pet ${onmap === 'pet' ? 'active' : ''}`}
            onClick={() => handleClick('pet')}
          >
            마이펫 지도
          </div>
          <div
            className={`tem ${onmap === 'temp' ? 'active' : ''}`}
            onClick={() => handleClick('temp')}
          >
            이상수온 지도
          </div>
          <div
            className={`spe ${onmap === 'spe' ? 'active' : ''}`}
            onClick={() => handleClick('spe')}
          >
            생물 다양성 지도
          </div>
        </div>
      )}

      <div className="map">
        <div className="map">
          {onmap === 'temp' && <Temp isLoaded={isLoaded} />}
          {onmap === 'pet' && <Animal isLoaded={isLoaded} />}
          {onmap === 'spe' && <Species isLoaded={isLoaded} />}
        </div>

      </div>
    </div>
  );
};

export default Map;
