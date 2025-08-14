import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Logo from '../../assets/img/main/logo.png'
import Star from '../../assets/img/main/Star.svg'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해 주세요.')
      return
    }

    try {
      setLoading(true)

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password
      })

      const token = res.data.data
      localStorage.setItem('token', token)
      
      navigate('/home')

    } catch (err) {
      console.error(err)
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('로그인에 실패했어요. 다시 시도해 주세요.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login_wrap contents'>
      <div className="logo_wrap">
        <img src={Logo} alt="logo" className="logo" />
        <div className="bubble bubble1" />
        <div className="bubble bubble2" />
        <div className="bubble bubble3" />
        <div className="bubble bubble4" />
      </div>

      <div className="title">LOGIN</div>

      <form className="form" onSubmit={onSubmit}>
        <div className="email">
          <div className="text">
            <img src={Star} alt="" />
            <p>EMAIL</p>
          </div>
          <input
            type="email"
            placeholder="EMAIL을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="password">
          <div className="text">
            <img src={Star} alt="" />
            <p>PASSWORD</p>
          </div>
          <div className="pw_row">
            <input
              type='password'
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="submit" disabled={loading}>
          SUBMIT
        </button>
        <Link to='/signup'>SIGN UP</Link>
      </form>
    </div>
  )
}

export default Login
