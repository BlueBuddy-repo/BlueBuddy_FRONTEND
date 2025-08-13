import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import Home from '../../assets/img/icon/home.svg'
import Book from '../../assets/img/icon/book.svg'
import Map from '../../assets/img/icon/map.svg'
import Mypage from '../../assets/img/icon/mypage.svg'
import HomeOn from '../../assets/img/icon/home_on.svg'
import BookOn from '../../assets/img/icon/book_on.svg'
import MapOn from '../../assets/img/icon/map_on.svg'
import MypageOn from '../../assets/img/icon/mypage_on.svg'

const Footer = () => {
    const location = useLocation();
    const path = location.pathname;
    const hidePaths = ['/landing', '/login', '/signup'];

    if (hidePaths.includes(path)) {
        return <div></div>;
    }

    return (
        <div className='footer_wrap'>
            <div className="btns">
                <Link to="/home">
                    <img src={path === '/home' ? HomeOn : Home} alt="home" />
                </Link>
                <Link to="/book">
                    <img src={path === '/book' ? BookOn : Book} alt="book" />
                </Link>
                <Link to="/map">
                    <img src={path === '/map' ? MapOn : Map} alt="map" />
                </Link>
                <Link to="/mypage">
                    <img src={path === '/mypage' ? MypageOn : Mypage} alt="mypage" />
                </Link>
            </div>
        </div>
    );
};

export default Footer;
