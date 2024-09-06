import React, {useRef, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userSigned, userSignout } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [ formData, setFormData ] = useState(
        { username: '', email: '', password: '', c_password: '' }
    )

    const [ formError, setFormError ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    function updateData(event){
        const { name, value } = event.target;

        setFormData((preData)=>{
            return{
                ...preData,
                [name] : value
            }
        })
    }
    

    async function submitData(event){
        event.preventDefault()
        setLoading(true)

        const validateFormData = () => {
            const mailformat = /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/;

            if (!formData.username) return 'Must provide your username!';
            else if (!formData.email) return 'Must provide your email!';
            else if(!formData.email.match(mailformat)) return 'Invalid email!';
            else if (!formData.password) return 'Must provide strong password!';
            else if (!formData.c_password) return 'Must provide confirm password!';
            else if(formData.password !== formData.c_password) return "Password doesn't match!"
            return null;
        };
    
        const formError = validateFormData();
        if (formError) {
            setFormError(formError);
            setLoading(false)
            return;
        }

        try{
            const res = await fetch('https://nagrik-aur-samvidhan-backend.vercel.app/api/auth/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if(data.success === false){
                console.log(data.message)
                setFormError(data.message)
                setLoading(false)
                return
            }
            dispatch(userSigned(data))
            setLoading(false)
            navigate('/')
        }
        catch(err){
            console.log(err)
            setLoading(false)
        }
    }
    

  return (
    <main className='signup-main'>

        <div className='signup-page'>
            <div className='signup-head'>
                <h1>Create an account</h1>
                <h5>Already have an account? <Link className='signin-link' to='/signin'>Signin</Link></h5>
            </div>

            <div className='signup-form-container'>
                <form className='signup-form'>

                    <input type='text' className='signup-input' placeholder='Username' onChange={updateData} name='username' value={formData.username} />
                    <input type='email' className='signup-input' placeholder='Email' onChange={updateData} name='email' value={formData.email} />
                    <input type='password' className='signup-input' placeholder='Password' onChange={updateData} name='password' value={formData.password} />
                    <input type='password' className='signup-input' placeholder='Confirm Password' onChange={updateData} name='c_password' value={formData.c_password} />

                    {formError && <p style={{color: 'red', marginTop: '20px', textAlign: 'center'}}>{formError}</p>}

                    <div className='button-container'>
                        <div disable={loading? 'true' : 'undefined'} onClick={submitData} className='signup-button'>{loading? "Loading..." : "Create account" }</div>
                    </div>
                </form>
            </div>
        </div>
    </main>
  )
}
