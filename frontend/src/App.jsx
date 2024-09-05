import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import "./App.css"
import Learn from './pages/Learn'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import Game from './pages/Game'
import ScrollRestoration from '../src/components/ScrollRestoration';

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
        <Route path='/learn/:topic' element={<Learn/>}></Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
     
    </>
    
  )
}

export default App
