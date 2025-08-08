import React from 'react';
import backgroundImage from '../../assets/img/starField.png';
import whaleImg from '../../assets/img/whale.png';
import badgeImage from '../../assets/img/badge.png';
import "../../assets/sass/collection/_creatureDetail.scss"

const creatureData = {
  nameKr: '혹등고래',
  nameEn: 'HUMPBACK WHALE',
  petName: '블루',
  scientificName: 'Megaptera novaeangliae',
  description: `'바다의 수호천사’ 혹등고래는 몸길이가 약 14~17미터, 몸무게는 약 40톤 정도에 달합니다. 수명은 약 45년 ~ 100년 사이로 인간과 유사합니다.
여름에는 극지방의 해양에서 먹이 활동을 하고, 겨울에는 번식지인 열대나 아열대의 바다로 이동해서 포유 활동을 합니다. 섭취량이 매우 많아 크릴새우 등을 1톤 가까이 섭취합니다.
혹등고래는 어느 고래와 마찬가지로 포유류로서 새끼를 낳고, 젖을 먹입니다. 하루에 많게는 400L 이상의 젖을 먹이므로 혹등고래는 수컷보다 암컷의 크기가 더욱 큽니다.`
};

const CreatureDetail = () => {
  return (
    <div>
      <div className='title_wrap'>
          <h2 className='title'>생물도감</h2>
      </div>

      <div className="creatureDetail_wrap">

        <div className="image-wrapper">
            <div className="background">
              <img src={backgroundImage} alt="background" />
            </div>
            <div className="creature">
                <img src={whaleImg} alt="creature" />
            </div>
              <div className="pet-name">{creatureData.petName}</div>
        </div>


        <div className="description-wrapper">
            <div className="upper-box">
              <div className="name-kr">{creatureData.nameKr}</div>
                <div className="name-en-wrapper">
                  <div className="name-en">{creatureData.nameEn}</div>
                  <div className="scientific-name">{creatureData.scientificName}</div>
                </div>
                <div className="level">
                  <img src={badgeImage} alt="badge" />
                </div>
            </div>

            <div className="description">{creatureData.description}</div>
        </div> 

      </div>    
    </div>

  );
};

export default CreatureDetail;
