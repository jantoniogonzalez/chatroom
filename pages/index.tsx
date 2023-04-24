import { Inter } from 'next/font/google'
import {firestore} from '../firebase/clientApp';
import {getAuth} from 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth';
import Chatroom from '@/components/Chatroom';
import SignIn from '@/components/SignIn';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const auth = getAuth(firestore)

  const [user, login, error] = useAuthState(auth);
  return (
    <main className="h-screen bg-gradient-to-r from-indigo-500 via-violet-400 to-purple-300 flex flex-col items-center">
      <h1 className='absolute mt-20 text-3xl font-bold text-white'>Chatroom</h1>
      <section>
        {user ? <Chatroom user={user} /> : <SignIn />}
      </section>
    </main>
  )
}
