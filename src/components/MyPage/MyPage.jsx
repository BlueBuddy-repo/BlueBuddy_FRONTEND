import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

import lockIcon from "../../assets/img/icon/lock.svg";
import petIcon from "../../assets/img/icon/pet.svg";
import chevronRight from "../../assets/img/icon/chevron-right.svg";


const MenuItem = ({ to, icon, label }) => (
    <Link to={to} className="menu-item" aria-label={label}>
        <div className="menu-item__left">
            <img src={icon} alt="" aria-hidden="true" className="menu-item__icon" />
            <span className="menu-item__label">{label}</span>
        </div>
        <img
            src={chevronRight}
            alt=""
            aria-hidden="true"
            className="menu-item__chevron"
        />
    </Link>
);

export default function MyPage() {
    const token = localStorage.getItem("accessToken");
    const API = process.env.REACT_APP_API_URL

    const [name, setName] = useState("");
    

    useEffect(() => {
        axios.get(`${API}/user/my`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            if (res.data.success) {
                setName(res.data.data);
            } 
        })
        .catch(err => {
            console.error(err);
            alert("사용자 정보를 불러오지 못했습니다.");
        });
    }, []);

    return (
        <div className="mypage_wrap contents">
            <h1 className="title">마이페이지</h1>
            <div className="username">{name}님</div>
            <nav className="menu">
                <MenuItem to="/myinfo" icon={lockIcon} label="나의 정보" />
                <MenuItem to="/petinfo" icon={petIcon} label="펫 정보" />
            </nav>
        </div>
    );
}