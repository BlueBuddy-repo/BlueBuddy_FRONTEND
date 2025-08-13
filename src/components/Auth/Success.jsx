import React from 'react'
import whaleImg from "../../assets/img/icon/whale.svg";
import turtleImg from "../../assets/img/icon/turtle.svg";
import sharkImg from "../../assets/img/icon/shark.png";
import Logo from '../../assets/img/main/logo.png'
import Spotlight from '../../assets/img/main/spotlight.png'

const Success = () => {
    return (
        <div className='success_wrap contents '>
            <img src={Spotlight} alt="" className='spotlight' />
            <div className="logo_wrap" >
                <img src={Logo} alt="" className="logo" />
                <div className="bubble bubble1" />
                <div className="bubble bubble2" />
                <div className="bubble bubble3" />
                <div className="bubble bubble4" />
            </div>

            <img src={whaleImg} alt="" className="whale" />
            <img src={turtleImg} alt="" className="turtle" />
            <img src={sharkImg} alt="" className="shark" />
            <div className="info">
                <p>나의 작은 &nbsp;<strong>바다친구</strong><div className="margin">&nbsp;</div></p>
                <p><div className="margin">&nbsp;</div><strong>BLUE BUDDY</strong>&nbsp;에</p>
                <p>&nbsp; 오신 것을 환영합니다. </p>
            </div>

        </div>
    )
}

export default Success
