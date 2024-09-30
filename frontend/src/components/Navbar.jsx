import React, { useEffect } from 'react'
import Logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { userSignout } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {


    const currentUser = useSelector((state) => state.user.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

     

    const handleUserSignOut = async () => {
        try {
            const res = await fetch('https://nagrik-aur-samvidhan-backend.vercel.app/api/auth/signout')
            const data = res.json()
            if (data.success === false) {
                console.log(data.message)
                return
            }
            dispatch(userSignout())
            navigate('/')
        }
        catch (err) {
            console.log(err)
        }
    }

    useGSAP(()=>{
        gsap.from(".title h1 span", {
            y: 100,
            opacity: 0,
            duration: 0.6,
            delay: 0.5,
            stagger: 0.05,
            color: "#00ff7b"
            });
        gsap.from(".logo", {
            opacity: 0,
            duration: 1,
            delay: 0.5,
        })
        gsap.from(".links-ul li", {
            y: 100,
            opacity: 0,
            duration: 0.5,
            delay: 0.5,
        })
        gsap.from(".links a", {
            y: 100,
            opacity: 0,
            duration: 0.5,
            delay: 0.5,
        })
    })
  return (
    <div className='navbar'>
        {/* <div className="logo">
            <img src={Logo} alt="Logo" className='logo-image'/>
        </div> */}
        <div id="google_translate_element"></div>
        
        <div className="title notranslate">
            <Link to="/">
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
            </Link>
        </div>
        <div className="links">
            <Link to="https://legislative.gov.in/" target='_blank'><li className='nav-options'><span class="material-symbols-outlined notranslate">book</span>The Constitution</li></Link>
            <ul className='links-ul'>
                <Link to="/game"><li className='nav-options'><span className="material-symbols-outlined notranslate">playing_cards</span>Play</li></Link>
                <Link to="/"><li className='nav-options'><span className="material-symbols-outlined notranslate">auto_stories</span>Learn</li></Link>
            </ul>
            {currentUser? <ul className='links-ul'>
                <Link to="/profile"><li className='nav-options notranslate'><span className="material-symbols-outlined notranslate">account_circle</span>{currentUser.username}</li></Link>
                <Link onClick={()=>handleUserSignOut()}><li className='nav-options'><span className="material-symbols-outlined notranslate">logout</span></li></Link>

            </ul> : 
            <ul className='links-ul'>
                <Link to="/signup">Signup</Link>
                <Link to="/signin">Signin</Link>
            </ul>}
        </div>
    </div>
  )
}

export default Navbar