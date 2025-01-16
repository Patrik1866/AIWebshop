import React, { useState } from "react";
import '../styles/loginPage.css';
import { useAuth } from "../util/AuthContext";
import Notification from "../components/Notification";

export function LoginPage() {
  const { user, setUser } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginFormData({ ...loginFormData, [id]: value })
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        credentials: 'include',
        body: JSON.stringify(loginFormData)
      });

      if (response.ok) {

        const data = await response.json();
        sessionStorage.setItem("token", data.token);

        const safeData = {
          id: data.user.id,
          surname: data.user.surname,
          firstname: data.user.firstname,
          email: data.user.email,
          phone: data.user.phone,
          username: data.user.username,
          isAdmin: data.user.isAdmin,
          isModerator: data.user.isModerator
        }
        sessionStorage.setItem("currentUser", JSON.stringify(safeData));
        setUser(data.user);

        setShowNotification(true);

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);

      } else {
        const errorText = response.text();
        alert(`Failed to login: ${errorText}`);
      }

    } catch (error) {
      alert(`An error occured: ${error}`);
    }
  };

  return (<>

    <div className="loginContainer">
      <h2>Bejelentkezés</h2>
      <form className="loginForm" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Felhasználónév</label>
          <br />
          <input placeholder="Felhasználónév" type="text" id="username" name="username" required value={loginFormData.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Jelszó</label>
          <br />
          <input placeholder="Jelszó" type="password" id="password" name="password" required value={loginFormData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="login-button">
          Bejelentkezés
        </button>
        <br />
        <label>
          Még nincs profilja?<a style={{ textDecoration: "underline", color: "#A6A278" }} href="/RegisterPage">Regisztráció</a>
        </label>
      </form>
    </div>

    {showNotification && <Notification message="Sikeres bejelentkezés" />}

  </>
  );
};


export default LoginPage