import React from 'react'
import Home from '../../assets/img/icon/home.svg'
import Book from '../../assets/img/icon/book.svg'
import Map from '../../assets/img/icon/home.svg'
import Mypage from '../../assets/img/icon/mypage.svg'

const Footer = () => {
    return (
        <div className='footer_wrap'>
            <div className="btns">
                <img src={Home} alt="home" />
                <img src={Book} alt="book" />
                <img src={Map} alt="map" />
                <img src={Mypage} alt="mypage" />
            </div>

        </div>
    )
}

export default Footer
