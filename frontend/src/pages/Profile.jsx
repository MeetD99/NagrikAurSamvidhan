import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ProgressBar from '../components/ProgressBar';

export default function Profile() {

  const currentUser = useSelector((state) => state.user.user)

  const [ user, setUserData ] = useState(null);
  console.log(user)

  async function getUserData(){
    try{
      const res = await fetch('/api/user/get-data', {
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
          <h3>Username: {user.username} <span className="material-symbols-outlined">edit</span></h3>
          <h3>Email: {user.email} <span className="material-symbols-outlined">edit</span></h3>
        </div>
        <div className="progress-sidebar">
          <h1>Progresses</h1>
          <div className="progress-each">
            <h3>Fundamental Rights: </h3>
            <ProgressBar value={Math.min(user.progress.rights, 7)} maxValue={7}/>
          </div>
          <div className="progress-each">
            <h3>Fundamental Duties: </h3>
            <ProgressBar value={Math.min(user.progress.duties, 11)} maxValue={11}/>
          </div>
          <div className="progress-each">
            <h3>Principles of State: </h3>
            <ProgressBar value={Math.min(user.progress.principles, 20)} maxValue={20}/>
          </div>
        </div>
      </div>
    </>
  )
}
