import { useEffect, useState } from 'react'
import './css/App.css'
import axios from 'axios'
import { User } from './fields/User.tsx';
import Header from './header.tsx';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = axios.get<User[]>("/listUsers");
      if (!response) {
        throw new Error('Failed');
      }
      setUsers((await response).data)
      console.log("Siker")
    } catch (e) {
      throw new Error('Failed');
    }
  }


  return (
    <div className='app'>
      <Header />
      <main className='main-content'>

      </main>
    </div>
  )
}

export default App
