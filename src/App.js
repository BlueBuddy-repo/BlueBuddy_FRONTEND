import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Section/Header'
import Footer from './components/Section/Footer'
import Home from './components/Home/Home'
import Map from './components/Map/Map';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
               		<Route path="/" element={<Home />}></Route>
                    <Route path="/map" element={<Map />}></Route>
                    
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
