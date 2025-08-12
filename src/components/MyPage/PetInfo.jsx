import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/sass/section/mypage/_petinfo.scss";

import backChevron from "../../assets/img/icon/chevron-left.svg";
import chevronLeft from "../../assets/img/icon/chevron-left.svg";
import chevronRight from "../../assets/img/icon/chevron-right.svg";
import whaleImg from "../../assets/img/icon/whale.svg";
import turtleImg from "../../assets/img/icon/turtle.svg";

const DUMMY_PETS = [
    { id: 1, speciesId: "whale",  imageUrl: whaleImg, defaultName: "블루" },
    { id: 2, speciesId: "turtle", imageUrl: turtleImg, defaultName: "파도" },
    { id: 3, speciesId: "whale3", imageUrl: whaleImg, defaultName: "코랄" },
];

export default function PetEdit() {
    const navigate = useNavigate();

    const [index, setIndex]   = useState(0);
    const [name, setName]     = useState(DUMMY_PETS[0].defaultName);
    const [saving, setSaving] = useState(false);
    const [error, setError]   = useState("");

    const pet = DUMMY_PETS[index];

    useEffect(() => {
        setName(DUMMY_PETS[index].defaultName);
    }, [index]);

    const isNameValid = useMemo(
        () => name.trim().length > 0 && name.trim().length <= 5,
        [name]
    );

    const handlePrev = () => {
        setIndex((i) => (i - 1 + DUMMY_PETS.length) % DUMMY_PETS.length);
    };
    const handleNext = () => {
        setIndex((i) => (i + 1) % DUMMY_PETS.length);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (!isNameValid) {
        setError("이름은 공백 제외 1~5자로 입력해 주세요.");
        return;
        }
        // api 연결
        setSaving(true);
        setTimeout(() => {
        setSaving(false);
        }, 600);
    };

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
            <img src={pet.imageUrl} alt="펫 이미지" className="pet_img" />
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
            placeholder="이름을 입력하세요 (최대 5자)"
            aria-label="펫 이름"
            required
            />
            <p className="hint">5자 이내로 지어주세요</p>

            {error && <p className="form_error">{error}</p>}

            <button className="submit_btn" type="submit">
                결정하기
            </button>
        </form>
        </main>
    );
}