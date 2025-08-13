import React from 'react'
import Star from '../../assets/img/main/Star.svg'
import Logo from '../../assets/img/main/logo.png'

const Signup = () => {
  return (
    <div className='signup_wrap'>
      <div className="logo_wrap" >
        <img src={Logo} alt="" className="logo" />
        <div className="bubble bubble1" />
        <div className="bubble bubble2" />
        <div className="bubble bubble3" />
        <div className="bubble bubble4" />
      </div>
      <div className="title">
        SIGN UP
      </div>
      <div className="form">
        <div className="name">
          <div className="text">
            <img src={Star} alt="" />
            <p>NAME</p>
          </div>
          <input type="text" placeholder='이름을 입력하세요'/>
        </div>

         <div className="email">
          <div className="text">
            <img src={Star} alt="" />
            <p>EMAIL</p>
          </div>
          <input type='email' placeholder='EMAIL을 입력하세요'/>
          <input type="number" placeholder='인증번호를 입력하세요'/>
        </div>

        <div className="password">
          <div className="text">
            <img src={Star} alt="" />
            <p>PASSWORD</p>
          </div>
          <input type="password" placeholder='비밀번호를 입력하세요'/>
          <input type="password" placeholder='비밀번호를 한번 더 입력하세요'/>
        </div>

        <div className="submit">
          SUBMIT
        </div>
      </div>
    </div>
  )
}

export default Signup
