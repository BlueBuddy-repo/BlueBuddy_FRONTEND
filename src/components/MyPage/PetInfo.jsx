import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import backChevron from "../../assets/img/icon/chevron-left.svg";
import chevronLeft from "../../assets/img/icon/chevron-left.svg";
import chevronRight from "../../assets/img/icon/chevron-right.svg";

export default function PetEdit() {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [index, setIndex] = useState(0);
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" | "error"

    const token = localStorage.getItem("accessToken");
    const API = process.env.REACT_APP_API_URL;

    const currentPet = pets[index];

    // 펫 리스트 가져오기
    useEffect(() => {
        axios
            .get(`${API}/user-creatures/getCreatureList`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.success && res.data.data.length > 0) {
                    setPets(res.data.data);
                    setName(res.data.data[0].petName);
                } else {
                    setError("펫 정보를 불러오지 못했어요.");
                }
            })
            .catch((err) => {
                console.error(err);
                setError("서버 오류로 펫 정보를 가져올 수 없어요.");
            });
    }, []);

    useEffect(() => {
        if (pets.length > 0) {
            setName(pets[index].petName);
        }
    }, [index, pets]);

    const isNameValid = useMemo(
        () => name.trim().length > 0 && name.trim().length <= 5,
        [name]
    );

    const handlePrev = () => {
        setIndex((i) => (i - 1 + pets.length) % pets.length);
    };

    const handleNext = () => {
        setIndex((i) => (i + 1) % pets.length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setMessageType("");

        if (!isNameValid) {
            setError("이름은 5자 이내로 지어주세요.");
            return;
        }

        try {
            setSaving(true);

            const res = await axios.put(
                `${API}/user-creatures/changeMyPet`,
                {
                    userCreatureId: currentPet.userCreatureId,
                    petName: name,
                    petImage: currentPet.petImage,
                    creatureId: currentPet.creatureId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                setMessage("펫 정보가 성공적으로 변경되었어요.");
                setMessageType("success");
            } else {
                setError(res.data.message || "펫 저장에 실패했어요.");
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                setError("인증되지 않은 사용자입니다. 다시 로그인해주세요.");
            } else if (err.response?.status === 404) {
                setError(err.response.data.message || "선택한 펫 정보를 찾을 수 없어요.");
            } else {
                setError("서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
            }
        } finally {
            setSaving(false);
        }
    };

    if (pets.length === 0) {
        return (
            <main className="petedit_wrap contents">
                <header className="petedit_header">
                    <button type="button" className="back-btn" onClick={() => navigate(-1)}>
                        <img src={backChevron} alt="뒤로가기" />
                    </button>
                    <h1 className="title">펫 정보</h1>
                </header>
                <p className="form_error">펫 정보가 없습니다.</p>
            </main>
        );
    }

    return (
        <main className="petedit_wrap contents">
            <header className="petedit_header">
                <button type="button" className="back-btn" onClick={() => navigate(-1)}>
                    <img src={backChevron} alt="뒤로가기" />
                </button>
                <h1 className="title">펫 정보</h1>
            </header>

            <section className="pet_visual">
                <button type="button" className="nav-arrow left" onClick={handlePrev}>
                    <img src={chevronLeft} alt="이전 펫" />
                </button>

                <div className="image_box">
                    <img src={`${API}/${currentPet.petImage}`} alt="펫 이미지" className="pet_img" />
                </div>

                <button type="button" className="nav-arrow right" onClick={handleNext}>
                    <img src={chevronRight} alt="다음 펫" />
                </button>
            </section>

            <form className="pet_form" onSubmit={handleSubmit} noValidate>
                <input
                    className="name_input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={5}
                    aria-label="펫 이름"
                    required
                />
                <p className="hint">5자 이내로 지어주세요</p>

                <button className="submit_btn" type="submit" disabled={saving}>
                    결정하기
                </button>

                {error && <p className="form_error">{error}</p>}
                {message && (
                    <p className={`form_${messageType}`}>{message}</p>
                )}
            </form>
        </main>
    );
}