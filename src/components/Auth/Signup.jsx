import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Star from '../../assets/img/main/Star.svg'
import Logo from '../../assets/img/main/logo.png'
import Success from './Success'
import axios from 'axios'

const Signup = () => {
    const [success, setSuccess] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [verifyStatus, setVerifyStatus] = useState(null);
    const [codeSent, setCodeSent] = useState(false)
    const [verified, setVerified] = useState(false)
    const [authLoading, setAuthLoading] = useState(false)

    const navigate = useNavigate()
    const API = process.env.REACT_APP_API_URL


    const onClickAuth = (mode) => {
        if (!email) return alert('EMAIL을 입력해 주세요 .')
        setAuthLoading(true)

        if (mode === 'send') {
            axios.post(`${API}/auth/sendCode?email=${encodeURIComponent(email)}`)
                .then(() => { setCodeSent(true); alert('인증번호를 전송했어요 .') })
                .catch((err) => { console.error(err); alert(err.response?.data?.message || '인증번호 전송 실패 .') })
                .finally(() => setAuthLoading(false))
            return
        }

        if (!code) { setAuthLoading(false); return alert('인증번호를 입력해 주세요 .') }

        axios.post(`${API}/auth/verifyCode`, {
            email: email,
            code: code
        })
            .then(() => { setVerifyStatus('success'); setVerified(true) })
            .catch(() => { setVerifyStatus('fail'); setVerified(false) })
            .finally(() => setAuthLoading(false))

    }



    const onSubmit = () => {
 
        if (!name || !email || !password || !password2) return alert('필수 항목을 입력해 주세요 .')
        if (password !== password2) return alert('비밀번호가 일치하지 않아요 .')
        if (!verified) return alert('이메일 인증을 완료해 주세요 .')

        axios.post(`${API}/auth/signup`, {
            name: name,
            email: email,
            password: password
        })
            .then((res) => { console.log('회원가입 성공:', res.data); setSuccess(true) })
            .catch((err) => { console.error(err); alert('회원가입에 실패했습니다 .') })
    }
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate('/')
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [success, navigate])

    if (success) {
        return <Success />
    }

    return (
        <div className='signup_wrap contents'>
            <div className="logo_wrap">
                <img src={Logo} alt="logo" className="logo" />
                <div className="bubble bubble1" />
                <div className="bubble bubble2" />
                <div className="bubble bubble3" />
                <div className="bubble bubble4" />
            </div>

            <div className="title">SIGN UP</div>
            <div className="form" onSubmit={onSubmit}>
                <div className="name">
                    <div className="text">
                        <img src={Star} alt="" />
                        <p>NAME</p>
                    </div>
                    <input
                        type="text"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="email">
                    <div className="text">
                        <img src={Star} alt="" />
                        <p>EMAIL</p>
                    </div>
                    <input
                        type="email"
                        placeholder="EMAIL을 입력하세요"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setCodeSent(false); setVerified(false); }}
                        required
                    />
                    <button className='in' type="button" onClick={() => onClickAuth('send')} disabled={authLoading}>
                        인증하기
                    </button>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="인증번호를 입력하세요"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                        disabled={!codeSent || verified}
                    />
                    <button className='in check' type="button" onClick={() => onClickAuth('verify')} disabled={authLoading || !codeSent}>
                        확인
                    </button>

                    {verifyStatus === 'success' && (
                        <p className='green'>*인증이 완료되었습니다. </p>
                    )}
                    {verifyStatus === 'fail' && (
                        <p className='red'>*인증에 실패했습니다. </p>
                    )}
                </div>


                <div className="password">
                    <div className="text">
                        <img src={Star} alt="" />
                        <p>PASSWORD</p>
                    </div>
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호를 한번 더 입력하세요"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="submit"
                    onClick={onSubmit}

                >
                    SUBMIT
                </button>
            </div>
        </div>
    )
}

export default Signup
