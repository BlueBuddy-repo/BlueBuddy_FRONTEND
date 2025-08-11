import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/sass/section/mypage/_myinfo.scss";

import backChevron from "../../assets/img/icon/chevron-left.svg"; 

export default function MyInfo() {
    const navigate = useNavigate();

    const [name, setName] = useState("전민선");
    const [prevPw, setPrevPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [newPw2, setNewPw2] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!prevPw) {
            setError("이전 비밀번호를 입력해주세요.");
            return;
        }
        if (!newPw || newPw.length < 8) {
            setError("새 비밀번호는 8자 이상이어야 해요.");
            return;
        }
        if (newPw !== newPw2) {
            setError("새 비밀번호가 일치하지 않습니다.");
            return;
        }
        // await fetch("/update/myInfo", { ... })
    };

    return (
        <main className="myinfo_wrap contents">
            <header className="myinfo_header">
                <button
                type="button"
                className="back-btn"
                onClick={() => navigate(-1)}
                >
                {<img src={backChevron} alt="뒤로가기" />}
                </button>
                <span className="title">나의 정보</span>
            </header>

            <form className="form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                    <label htmlFor="name">이름</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                </div>

                <div className="field">
                    <label htmlFor="prevPw">이전 비밀번호</label>
                        <input
                            id="prevPw"
                            type="password"
                            value={prevPw}
                            onChange={(e) => setPrevPw(e.target.value)}
                            required
                        />
                </div>

                <div className="field">
                    <label htmlFor="newPw">새 비밀번호</label>
                        <input
                            id="newPw"
                            type="password"
                            value={newPw}
                            onChange={(e) => setNewPw(e.target.value)}
                            placeholder=""
                        />
                </div>

                <div className="field">
                    <label htmlFor="newPw2">새 비밀번호 확인</label>
                        <input
                            id="newPw2"
                            type="password"
                            value={newPw2}
                            onChange={(e) => setNewPw2(e.target.value)}
                            placeholder=""
                        />
                </div>

                {error && <p className="error" role="alert">{error}</p>}

                <button type="submit" className="submit-btn">
                수정하기
                </button>
            </form>
        </main>
    );
}