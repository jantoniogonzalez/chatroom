import React from 'react'
import firebase from 'firebase/app'
import { firestore } from '@/firebase/clientApp'
import {getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged} from 'firebase/auth'
import { useEffect } from 'react'


type Props = {}

useEffect

const SignIn = (props: Props) => {
  const auth = getAuth(firestore);
  const provider = new GoogleAuthProvider();

  const login = () =>{ 
    signInWithPopup(auth, provider)
      .then((result)=>{
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log({credential, token, user})
    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({errorCode, errorMessage, email, credential})
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
  })


  return (
    <div className='h-screen flex flex-col justify-center'>
      <button onClick={login} className='bg-white text-xl font-bold'>Sign In With Google</button>
    </div>

  )
}

export default SignIn