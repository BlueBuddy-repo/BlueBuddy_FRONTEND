import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Section/Header'
import Footer from './components/Section/Footer'
import Home from './components/Home/Home'
import Map from './components/Map/Map';
import CollectionPage from './components/Collection/CollectionPage'
import CreatureDetail from './components/Collection/CreatureDetail'

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
               		<Route path="/" element={<Home />}></Route>
                    <Route path="/map" element={<Map />}></Route>
                    <Route path="/book" element={<CollectionPage />} />
                    <Route path="/book/creature/:id" element={<CreatureDetail />} /> 
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
