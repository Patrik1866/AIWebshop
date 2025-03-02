import React, { useState } from "react";
import '../styles/loginPage.css';
import Notification from "../components/Notification";
import authService from "../util/AuthService";
import { LoginForm } from "../entities/LoginForm";
import cartService from "../util/CartService";


const LoginPage = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: '',
    password: ''
  });
  const [showNotifification, setShowNotifification] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm({ ...loginForm, [id]: value })
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
        body: JSON.stringify(loginForm)
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
        authService.setUser(safeData);

        const cartContent = await cartService.fetchCartContent();
        cartService.setCartContent(cartContent);

        console.log(cartContent)

        setShowNotifification(true)

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

  return (
    <>

<div className="login-container">
  <h2>Bejelentkezés</h2>
  <form className="login-form" onSubmit={handleLogin}>
    <div className="form-group">
      <label>Felhasználónév</label>
      <br />
      <input placeholder="Felhasználónév" type="text" id="username" name="username" required value={loginForm.username} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Jelszó</label>
      <br />
      <input placeholder="Jelszó" type="password" id="password" name="password" required value={loginForm.password} onChange={handleChange} />
    </div>
    <button type="submit" className="login-button">
      Bejelentkezés
    </button>
    <br />
    <label>
      Még nincs profilja?<a className="register-link" href="/RegisterPage">Regisztráció</a>
    </label>
  </form>
</div>

      {showNotifification && <Notification message="Sikeres bejelentkezés" />}

    </>
  );
};

export default LoginPage;