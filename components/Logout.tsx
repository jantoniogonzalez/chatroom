import React, { useEffect } from 'react'
import { firestore } from '@/firebase/clientApp'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

type Props = {}

const Logout = (props: Props) => {
    const auth = getAuth(firestore);

    const logout = ()=>{
        signOut(auth)
        .then(()=>{
            console.log("Successfuly logged out")
        }).catch(()=>{
            console.log("An error has occured")
        })
    }
    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Logout