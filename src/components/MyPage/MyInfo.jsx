import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import backChevron from "../../assets/img/icon/chevron-left.svg"; 

export default function MyInfo() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [prevPw, setPrevPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [newPw2, setNewPw2] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // success | error

    const token = localStorage.getItem("accessToken");
    const API = process.env.REACT_APP_API_URL

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        // 유효성 검사
        if (!prevPw) {
            setMessage("이전 비밀번호를 입력해주세요.");
            setMessageType("error");
            return;
        }
        if (newPw && newPw.length < 8) {
            setMessage("새 비밀번호는 8자 이상이어야 해요.");
            setMessageType("error");
            return;
        }
        if (newPw && newPw !== newPw2) {
            setMessage("새 비밀번호가 일치하지 않습니다.");
            setMessageType("error");
            return;
        }

        const body = {
            name: name,
            password: prevPw,
            newPassword: newPw ? newPw : null,
        };

        try {
            const res = await axios.put(`${API}/user/update`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (res.data.success) {
                setMessage("정보 변경에 성공했어요.");
                setMessageType("success");
            }
        } catch (err) {
            console.error(err);

            if (err.response?.status === 400 || err.response?.status === 401 || err.response?.status === 404 || err.response?.status === 500) {
                setMessage(err.response.data.message || "서버 오류가 발생했어요.");
            } else {
                setMessage("서버 오류. 잠시 후 다시 시도해주세요.");
            }
            setMessageType("error");
        }
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

                {message && (
                    <p className={`message ${messageType}`} role="alert">
                        {message}
                    </p>
                )}

                <button type="submit" className="submit-btn">
                수정하기
                </button>
            </form>
        </main>
    );
}
