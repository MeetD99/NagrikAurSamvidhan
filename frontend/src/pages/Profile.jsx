import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {

  const currentUser = useSelector((state) => state.user.user)

  const [ user, setUserData ] = useState(null);

  async function getUserData(){
    try{
      const res = await fetch('/api/user/get-data', {
        method : 'POST',
        headers : { 
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({ userId : currentUser? currentUser._id : null })
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
  }, []);

  return (
    <div>User Profile</div>
  )
}
