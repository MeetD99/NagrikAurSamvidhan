import React from 'react'
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
            const res = await fetch('/api/auth/signout')
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
            stagger: 0.2
        })
    })
  return (
    <div className='navbar'>
        <div className="logo">
            <img src={Logo} alt="Logo" className='logo-image'/>
        </div>
        <div className="title">
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
            <div></div>
            <ul className='links-ul'>
                <li><Link to="/learn">Learn</Link></li>
                <li><Link to="/">Practice</Link></li>
            </ul>
            {currentUser? <ul className='links-ul'>
                <Link to="/profile">{currentUser.username}</Link>
                <Link onClick={()=>handleUserSignOut()}><span className="material-symbols-outlined">logout</span></Link>

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