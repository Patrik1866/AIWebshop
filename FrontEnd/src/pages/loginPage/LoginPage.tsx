import React, { useState } from "react";
import './loginPage.css';

export function LoginPage() {
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
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(loginFormData)
      });

      if (response.ok) {
        alert("User logged in successfully");
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("currentUser", JSON.stringify(data.user));
        window.location.href = "/";
      } else {
        const errorText = response.text();
        alert(`Failed to login: ${errorText}`);
      }

    } catch (error) {
      alert(`An error occured: ${error}`);
    }
  };

  return (

    <div className="loginContainer">
      <h2>Bejelentkezés</h2>
      <form className="loginForm" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Felhasználónév</label>
          <br />
          <input placeholder="Felhasználónév" type="text" id="username" name="email" required value={loginFormData.username} onChange={handleChange} />
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

  );
};


export default LoginPage