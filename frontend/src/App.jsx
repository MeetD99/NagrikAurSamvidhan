import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import "./App.css"
import Learn from './pages/Learn'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/learn/:topic' element={<Learn/>}></Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
     
    </>
    
  )
}

export default App
