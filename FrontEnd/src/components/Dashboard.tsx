import { useContext } from 'react';
import { UserContext } from '../util/UserContext';

const Dashboard = () => {
  const { currentUser, token } = useContext(UserContext) as any;

  return (<>
    {!currentUser &&
      <div>
        <h1>Welcome, {currentUser.username}!</h1>
        <p>Token: {token}</p>
      </div>
    }
  </>
  );
};

export default Dashboard;