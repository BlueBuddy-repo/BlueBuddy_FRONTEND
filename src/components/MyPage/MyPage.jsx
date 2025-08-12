import React from "react";
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
    return (
        <div className="mypage_wrap contents">
            <h1 className="title">마이페이지</h1>
            <div className="username">bluebuddy님</div>

            <nav className="menu">
                <MenuItem to="/myinfo" icon={lockIcon} label="나의 정보" />
                <MenuItem to="/petinfo" icon={petIcon} label="펫 정보" />
            </nav>
        </div>
    );
}