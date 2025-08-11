import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Section/Header'
import Footer from './components/Section/Footer'
import Home from './components/Home/Home'
import Map from './components/Map/Map';
import MyPage from './components/MyPage/MyPage';
import MyInfo from './components/MyPage/MyInfo';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/map" element={<Map />}></Route>
                <Route path="/mypage" element={<MyPage />}></Route>
                <Route path="/myinfo" element={<MyInfo />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
