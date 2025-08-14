import React from 'react'
import Polygon from '../../assets/img/map/Polygon.svg'

const Modal = ({ setOpen }) => {
    return (
        <div className='modal_wrap'>
            <img src={Polygon} alt="" />

            <div className="wrap">
                <div className="close" onClick={() => setOpen(false)}>X</div>
                <div className="title">
                    오염된 지역 <p>3/5</p>
                </div>
                <div className="text">
                    <p> <span className="blue">제로웨이스트 행동</span>을 하고</p>
                    <span>
                        새로운 생물 카드를 획득하세요!
                    </span>

                </div>
                <div className='btn'>제로웨이스트 인증하기</div>

                <div className="info">
                    자주출몰하는 동물
                    <div className="animal">
                        푸른바다거북, 백상아리
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Modal
