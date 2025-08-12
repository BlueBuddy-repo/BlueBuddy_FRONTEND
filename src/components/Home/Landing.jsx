import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../../assets/img/main/logo.png'

const bubbleVariants = {
  float: (delay = 0) => ({
    y: [0, -50, 0],
    opacity: [0.7, 1, 0.7],
    scale: [1, 1.06, 1],
    transition: {
      duration: 2.6,
      ease: 'easeInOut',
      delay
    }
  })
}
const btnsContainer = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.12 }
  }
}
const Landing = () => {
  const [anime, setAnime] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnime(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className='landing_wrap'>
      <div className="logo_wrap" style={{ top: anime ? undefined : '10rem' }}>
        <img src={Logo} alt="" className="logo" />
        <motion.div className="bubble bubble1" variants={bubbleVariants} custom={0.0} animate="float" />
        <motion.div className="bubble bubble2" variants={bubbleVariants} custom={0.2} animate="float" />
        <motion.div className="bubble bubble3" variants={bubbleVariants} custom={0.4} animate="float" />
        <motion.div className="bubble bubble4" variants={bubbleVariants} custom={0.6} animate="float" />

      </div>
      {anime ? <div className="text">나의 작은 바다 친구</div> :
        <>
          <motion.div className="btns" variants={btnsContainer} initial="hidden"
            animate="show">
            <div className="signup" onClick={() => navigate('/signup')}>SIGN UP</div>
            <div className="login" onClick={() => navigate('/login')} >LOGIN</div>
          </motion.div>
        </>
      }

    </div>
  )
}

export default Landing
