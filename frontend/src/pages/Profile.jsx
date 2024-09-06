import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ProgressBar from '../components/ProgressBar';

export default function Profile() {

  const currentUser = useSelector((state) => state.user.user)

  const [ user, setUserData ] = useState(null);
  console.log(user)

  async function getUserData(){
    try{
      const res = await fetch('https://nagrik-aur-samvidhan-backend.vercel.app/api/user/get-data', {
        method : 'POST',
        headers : { 
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({ userId : currentUser ? currentUser._id : null })
      })
      
      const data = await res.json()
  
      if(data.success === false){
        console.log(data.message)
        return
      }
  
      setUserData(data.userData);
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getUserData();
  }, [currentUser]);

  if (!user) {
    return <div>Loading...</div>; // Add a loading state while data is being fetched
  }

  return (
    <>
      <div className="user-container">
        <div className="user-info">
          <h1>Welcome back, {user.username}!</h1>
          <h3>Username </h3>
          <p>{user.username} <span className="material-symbols-outlined">edit</span></p>
          <h3>Email</h3>
          <p>{user.email} <span className="material-symbols-outlined">edit</span></p>
          <h3>Password</h3>
          <p>* * * * * * * <span className="material-symbols-outlined">edit</span></p>
        </div>
        <div className="progress-sidebar">
          <h1>Progress</h1>
          <div className="progress-each">
            <h3>Fundamental Rights: </h3>
            <ProgressBar value={Math.min(user.progress.rights, 7)} maxValue={7}/>
          </div>
          <div className="progress-each">
            <h3>Fundamental Duties: </h3>
            <ProgressBar value={Math.min(user.progress.duties, 11)} maxValue={11}/>
          </div>
          <div className="progress-each">
            <h3>Preamble of the Constitution: </h3>
            <ProgressBar value={Math.min(user.progress.preamble, 5)} maxValue={5}/>
          </div>
        </div>
      </div>
    </>
  )
}
