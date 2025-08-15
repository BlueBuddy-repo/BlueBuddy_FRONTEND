import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import chevronDown from "../../assets/img/icon/chevron-down.svg";

const token = localStorage.getItem("accessToken");
const API = process.env.REACT_APP_API_URL


const ACTIONS = [
    "텀블러 사용하기",
    "리필 제품 사용하기",
    "대중교통 이용하기",
    "일회용품 대신 다회용품 사용하기",
    "쓰레기 분리배출 정확히 하기",
    ];

    export default function ZeroWasteUpload() {
    const fileRef = useRef(null);
    const [action, setAction] = useState(ACTIONS[0]);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // 'reusable' | 'non-reusable' | null

    const onPickImage = () => fileRef.current?.click();

    const onFileChange = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        setPreviewUrl(URL.createObjectURL(f));
        setResult(null);
    };

    // 미리보기 URL 정리
    useEffect(() => {
        return () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);

        try {
            const fd = new FormData();
            fd.append("file", file); 

            const res = await axios.post(`${API}/api/zeroWaste`, fd, {
                headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                },
            });

            if (res.data == null) {
                throw new Error("서버에서 유효한 응답을 받지 못했습니다."); 
            }
            const isReusable = res.data;
            console.log("인증 결과:", isReusable);
            setResult(isReusable ? "reusable" : "non-reusable");
        } catch (err) {
            alert("서버 오류 발생. 잠시후 다시 시도해주세요.");
            setResult("non-reusable");
            } finally {
            setLoading(false);
        }
    };

    return (
        <main className="zwu_wrap contents">
        <h1 className="title">제로 웨이스트 인증하기</h1>

        <form className="zwu_form" onSubmit={onSubmit} noValidate>
            <div className="field">
            <label htmlFor="action" className="label">행동 선택</label>
            <select
                id="action"
                className="select"
                value={action}
                onChange={(e) => setAction(e.target.value)}
            >
                {ACTIONS.map((a) => (
                <option
                    key={a}
                    value={a}
                    disabled={a !== "텀블러 사용하기"}
                >
                    {a}
                </option>
                ))}
            </select>
            <img src={chevronDown} alt="" className="select_arrow" aria-hidden />
            </div>

            <div className={`upload ${result === "reusable" ? "is-success" : ""}`}>
            <button
                type="button"
                className={`upload_box ${result === "reusable" ? "shrink" : ""}`}
                onClick={onPickImage}
                aria-label="사진 업로드"
                disabled={loading}
            >
                {previewUrl ? (
                <img
                    src={previewUrl}
                    alt="미리보기"
                    className="preview"
                />
                ) : (
                <div className="placeholder">
                    <p>클릭하여 사진 업로드</p>
                </div>
                )}
            </button>

            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={onFileChange}
                className="file_input"
            />
            </div>

            <div className="btn_area">
            {result !== "reusable" && (
                <button
                type="submit"
                className="submit_btn"
                disabled={!file || loading}
                >
                {loading ? "분석 중…" : "인증하기"}
                </button>
            )}
            {result === "non-reusable" && (
                <p className="retry_msg">인증을 실패했습니다. <br />
                텀블러가 잘 보이게 다시 업로드 해주세요.</p>
            )}
            </div>

            {result === "reusable" && (
                <div
                    className={`success_msg ${result === "reusable" ? "show" : ""}`}
                    role="status"
                    aria-live="polite"
                >
                    <div className="check_circle">✔</div>
                    <h2>인증 성공!</h2>
                    <p>해양 생물의 서식지가 정화되었어요!<br />지도에서 확인해보세요</p>
                </div>
            )}
        </form>
        </main>
    );
}