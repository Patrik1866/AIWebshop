import React, { useState } from "react";
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
          "Content-Type": "application/json"
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

      <div className="max-w-md mx-auto mt-30 px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center text-main-green-title mb-6">Bejelentkezés</h2>
          <form className="space-y-2" onSubmit={handleLogin}>
            <div >
              <label className=" font-bold text-main-green">Felhasználónév</label>
              <br />
              <input
                className="w-full px-3 py-2 border border-main-green-title rounded-lg shadow-lg text-main-green placeholder-main-green focus:outline-none focus:scale-102 transition duration-300 ease-in-out sm:text-sm"
                placeholder="Felhasználónév" type="text" id="username" name="username" required value={loginForm.username} onChange={handleChange} />
            </div>
            <div>
              <label className=" font-bold text-main-green">Jelszó</label>
              <br />
              <input
                className="w-full px-3 py-2 border border-main-green-title rounded-lg shadow-lg text-main-green placeholder-main-green focus:outline-none focus:scale-102 transition duration-300 ease-in-out sm:text-sm"
                placeholder="Jelszó" type="password" id="password" name="password" required value={loginForm.password} onChange={handleChange} />
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm font-bold text-xl text-main-green-title bg-main-brown hover:bg-main-brown-hover cursor-pointer mt-10">
                Bejelentkezés
              </button>
            </div>
            <br />
            <div className="text-center text-md">
                <span className="text-main-green">Még nincs profilja?</span>
                <a className="font-medium text-main-green-title hover:text-main-green transition duration-150 ease-in-out ml-2 underline" href="/RegisterPage">Regisztráljon itt!</a>
            </div>
          </form>
        </div>
      </div>

      {showNotifification && <Notification message="Sikeres bejelentkezés" />}

    </>
  );
};

export default LoginPage;