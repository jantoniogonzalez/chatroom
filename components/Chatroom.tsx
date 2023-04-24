import React, { useState } from 'react'
import firebase from 'firebase/app'
import { firestore } from '@/firebase/clientApp'
import {User, getAuth, onAuthStateChanged} from 'firebase/auth'
import { useEffect } from 'react'
import { doc, addDoc, collection, getFirestore, query, orderBy, limit, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import Logout from './Logout'
import Chatmessage from './Chatmessage'

type Props = {
  user: User;
}

const Chatroom = (props: Props) => {
  const db = getFirestore(firestore);
  const messagesRef = collection(db, "messages");
  const uid = props.user.uid;
  const photourl = props.user.photoURL;
  const [newMessage, setNewMessage] = useState<string>("");
  const [messageValue, setMessageValue] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  

  const getMessages = async () =>{
    const q = query(messagesRef, orderBy('createdAt'), limit(25));
    const querySnapshot = await getDocs(q);

    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot)=>{
      result.push(snapshot);
    });

    setMessageValue(result);
  }

  const sendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const messageData = {
      createdAt : Date.now().toString(),
      photourl,
      text: newMessage,
      uid,
    }
    const message = addDoc(messagesRef, messageData);
    console.log("Sending Message");
    setNewMessage("");
  }

  useEffect(()=>{
    getMessages();

    setTimeout(()=>{
      setLoading(false);
    }, 2000)
  })

  return (
    <div className='flex flex-col'>
      <Logout/>
      <div>
        {loading}
      </div>
      <form className='flex' onSubmit={sendMessage}>
        <input type='text' value={newMessage} onChange={(e)=> setNewMessage(e.target.value)}/>
        <button type='submit' disabled={!newMessage}>Send</button>
      </form>
    </div>
  )
}

export default Chatroom