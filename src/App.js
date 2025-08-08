import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Section/Header'
import Footer from './components/Section/Footer'
import Home from './components/Home/Home'
import CollectionPage from './components/Collection/CollectionPage'
import CreatureBook from './components/Collection/CreatureBook'

// import CreatureDetail from './components/Collection/CreatureDetailImage'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-collection" element={<CollectionPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
