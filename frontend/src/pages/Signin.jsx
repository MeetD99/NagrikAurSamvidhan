import React, {useRef, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userSigned, userSignout } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [ formData, setFormData ] = useState(
        { email: '', password: '' }
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

            if (!formData.email) return 'Please Enter email!';
            else if(!formData.email.match(mailformat)) return 'Invalid email!';
            else if (!formData.password) return 'Please Enter password!';
            return null;
        };
    
        const formError = validateFormData();
        if (formError) {
            setFormError(formError);
            setLoading(false)
            return;
        }

        try{
            const res = await fetch('/api/auth/signin', {
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
            navigate('/')
            setLoading(false)
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
                <h1>Sign in</h1>
                <h5>New to नाGRIK औR संविDHAN? <Link className='signin-link' to='/signup'>Signup</Link></h5>
            </div>

            <div className='signup-form-container'>
                <form className='signup-form'>

                    <input type='email' className='signup-input' placeholder='Email' onChange={updateData} name='email' value={formData.email} />
                    <input type='password' className='signup-input' placeholder='Password' onChange={updateData} name='password' value={formData.password} />

                    {formError && <p style={{color: 'red', marginTop: '20px', textAlign: 'center'}}>{formError}</p>}

                    <div className='button-container'>
                        <div disable={loading? 'true' : 'undefined'} onClick={submitData} className='signup-button'>{loading? "Loading..." : "Sign in" }</div>
                    </div>
                </form>
            </div>
        </div>
    </main>
  )
}
