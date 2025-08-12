import React from "react";
import { useNavigate } from "react-router-dom";

import zeroWasteImg from "../../assets/img/icon/zero-waste.png";


export default function ZeroWaste() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/zerowaste/upload");
    };
    
    return (
        <main className="zerow_wrap contents">
            <h1 className="title">제로 웨이스트</h1>

            <section className="poster">
                <figure className="figure">
                <img src={zeroWasteImg} alt="ZERO WASTE 포스터" />
                </figure>
            </section>

            <section className="desc">
                <p>
                제로 웨이스트는 쓰레기 발생을 최소화하고 자원을 최대한 재활용하여
                폐기물을 줄이는 것을 목표로 하는 운동입니다. 이는 일상 생활에서
                불필요한 소비를 줄이고 재사용 가능한 제품을 사용하며, 재활용을
                생활화하는 것을 포함합니다. 궁극적으로는 매립되거나 소각되는
                쓰레기를 줄여 환경 보호에 기여하는 것을 목적으로 합니다.
                </p>
            </section>

            <section className="guide">
                <h2 className="subtitle">실천 방법</h2>
                <ol className="list">
                <li>텀블러 사용하기</li>
                <li>리필 제품 사용하기</li>
                <li>대중교통 이용하기</li>
                <li>일회용품 대신 다회용품 사용하기</li>
                <li>쓰레기 분리배출 정확히 하기</li>
                </ol>
            </section>

            <div className="cta_area">
                <button
                type="button"
                className="cta_btn"
                onClick={handleClick}
                >
                제로 웨이스트 인증하기
                </button>
            </div>
        </main>
    );
}