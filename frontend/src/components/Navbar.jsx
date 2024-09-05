import React from 'react'
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
    useGSAP(()=>{
        gsap.from(".title h1 span", {
            y: 100,
            opacity: 0,
            duration: 0.6,
            delay: 1,
            stagger: 0.05,
            color: "#00ff7b"
            });
        gsap.from(".logo", {
            opacity: 0,
            duration: 1,
            delay: 1,
        })
        gsap.from(".links-ul li", {
            y: 100,
            opacity: 0,
            duration: 0.5,
            delay: 1,
            stagger: 0.2
        })
    })
  return (
    <div className='navbar'>
        <div className="logo">
            <img src={Logo} alt="Logo" className='logo-image'/>
        </div>
        <div className="title">
            <h1>
                <span>ना</span>
                <span>G</span>
                <span>R</span>
                <span>I</span>
                <span>K</span>
                <span>&nbsp;</span>
                <span>औ</span>
                <span>R</span>
                <span>&nbsp;</span>
                <span>सं</span>
                <span>वि</span>
                <span>D</span>
                <span>H</span>
                <span>A</span>
                <span>N</span>
            </h1>
        </div>
        <div className="links">
            <ul className='links-ul'>
                <li><Link to="/">Learn</Link></li>
                <li><Link to="/">Practice</Link></li>
                <li><Link to="/">Profile</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar