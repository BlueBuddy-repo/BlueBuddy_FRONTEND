import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../../assets/img/starField.png';
import badgeLv1 from '../../assets/img/badgeLv1.png';
import badgeLv2 from '../../assets/img/badgeLv2.png';
import badgeLv3 from '../../assets/img/badgeLv3.png';
import backImg from '../../assets/img/icon/chevron-left.svg';

const CreatureDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [creatureDetail, setCreatureDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const token = ''

    const getBadgeImage = (level) => {
      switch(level) {
        case 1: return badgeLv1;
        case 2: return badgeLv2;
        case 3: return badgeLv3;
        default: return null;
      }
    };

    useEffect(() => {
        axios.get(`/user-creatures/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then(res => {
        if (res.data.success) {
            console.log('API 데이터:', res.data.data); 
            setCreatureDetails(res.data.data);
        } else {
            setError('생물 정보 데이터를 불러올 수 없습니다.');
        }
        })
        .catch(err => {
        setError('API 호출 실패');
        console.error('API 호출 실패:', err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [id, token]);

    if (error) return <div>{error}</div>;

    return (
      <div className='creature_detail contents'> 
        <div className='title_wrap'>
          <div className="back" onClick={() => navigate(-1)}>
            <img src={backImg} alt="back" />
          </div>
            <h2 className='title'>생물도감</h2>
        </div>
 
        <div className="creatureDetail_wrap">

          <div className="image-wrapper">
              <div className="background">
                <img src={backgroundImage} alt="background" />
              </div>

              {!loading && (<>
              <div className="creature">
                  <img src={creatureDetail.imageUrl} alt="creature" 
                  className={loaded ? 'loaded' : ''}
                  onLoad={() => setLoaded(true)}
                  />
              </div>
                <div className="pet-name">{creatureDetail.petName}</div>
              </>)}
          </div>

          {!loading && (
          <div className="description-wrapper">
              <div className="upper-box">
                <div className="name-kr">{creatureDetail.nameKr}</div>
                  <div className="name-en-wrapper">
                    <div className="name-en">{creatureDetail.nameEn}</div>
                    <div className="scientific-name">{creatureDetail.scientificName}</div>
                  </div>
                  <div className="level">
                    {creatureDetail.endangermentLevel && (
                            <img src={getBadgeImage(creatureDetail.endangermentLevel)} alt={`badge level ${creatureDetail.endagermentLevel}`} />
                          )}
                  </div>
              </div>
              <div className="description">{creatureDetail.description}</div>
          </div> 
          )}
        </div>    
      </div>

    );
};

export default CreatureDetail;
