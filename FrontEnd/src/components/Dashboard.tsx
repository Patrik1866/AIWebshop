import { useState } from "react";
import { User } from "../entities/User";
import authService from "../util/AuthService";


const Dashboard = () => {
  const [user] = useState<User | null>(authService.getUser());


    if (!authService.isAuthenticated()) {
      return <p>Kérlek jelentkezz be hogy lásd az oldalt</p>;
    }

  if (!authService.isAuthenticated()) {
    return <p>Kérlek jelentkezz be hogy lásd az oldalt</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>User: {user?.username}</p> <br />
      <p>Email {user?.email}</p>
    </div>
  );
};

export default Dashboard;