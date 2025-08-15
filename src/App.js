import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import Header from './components/Section/Header'
import Footer from './components/Section/Footer'
import Home from './components/Home/Home'
import Map from './components/Map/Map';
import MyPage from './components/MyPage/MyPage';
import MyInfo from './components/MyPage/MyInfo';
import PetInfo from './components/MyPage/PetInfo';
import CollectionPage from './components/Collection/CollectionPage'
import CreatureDetail from './components/Collection/CreatureDetail'
import Landing from './components/Home/Landing';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ZeroWasteMain from './components/ZeroWaste/ZeroWasteMain';
import ZeroWasteUpload from './components/ZeroWaste/ZeroWasteUpload';
import Newpet from './components/Map/Newpet';

const App = () => {
   
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/map" element={<Map />}></Route>
                <Route path="/newpet" element={<Newpet />}></Route>
                <Route path="/mypage" element={<MyPage />}></Route>
                <Route path="/myinfo" element={<MyInfo />}></Route>
                <Route path="/petinfo" element={<PetInfo />}></Route>
                <Route path="/book" element={<CollectionPage />} />
                <Route path="/book/creature/:id" element={<CreatureDetail />} />
                <Route path="/zerowaste" element={<ZeroWasteMain />}></Route>
                <Route path="/zerowaste/upload" element={<ZeroWasteUpload />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
