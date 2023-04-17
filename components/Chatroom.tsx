import React from 'react'
import firebase from 'firebase/app'
import { firestore } from '@/firebase/clientApp'
import {getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged} from 'firebase/auth'
import { useEffect } from 'react'

type Props = {}

const Chatroom = (props: Props) => {
  const auth = getAuth(firestore);

  const logout = () =>{
    auth.signOut()
      .then(()=>{
      console.log("Sign-out successful")
    }).catch((error)=>{
      console.log("An error has occured")
    })};

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        const uid =user.uid;
        console.log({uid});
      } else{
        console.log("no user")
      }
    })
  });

  return (
    <div>
      <button onClick={logout} className='bg-white text-xl font-bold'>Logout</button>
    </div>
  )
}

export default Chatroom