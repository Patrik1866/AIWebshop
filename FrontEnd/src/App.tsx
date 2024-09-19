import { useEffect, useState } from 'react'
import './css/App.css'
import axios from 'axios'
import { User } from './fields/User.tsx';

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
    <>
      <div>
        {users.map((user) => (
          <table>
            <tr>
              <td>{user.id}</td>
              <td>{user.surename}</td>
            </tr>
          </table>
        ))}
      </div>
    </>
  )
}

export default App
