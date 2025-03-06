import React, { useState } from "react";
import { User } from "../entities/User";
import '../styles/registerPage.css'

export function RegisterPage() {
  const [registerFormData, setRegisterFormData] = useState<Omit<User, 'id'>>({
    username: "",
    surname: "",
    firstname: "",
    email: "",
    password: "",
    phone: "",
    isAdmin: false,
    isModerator: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterFormData({ ...registerFormData, [id]: value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerFormData)
      });

      if (response.ok) {
        alert("User registered successfully");
        window.location.href = "/loginPage";
      } else {
        const errorText = await response.text();
        alert(`Failed to register user: ${errorText}`);
      }
    } catch (error) {
      alert(`An error occured: ${error}`);
    }
  }

  return (
    <div className="register-container">
  <h2>Regisztráció</h2>
  <form className="register-form" onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Felhasználónév</label>
      <br />
      <input placeholder="felhasználónév" type="text" id="username" name="username" required value={registerFormData.username} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Vezetéknév</label>
      <br />
      <input placeholder="vezetéknév" type="text" id="surname" name="surname" required value={registerFormData.surname} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Keresztnév</label>
      <br />
      <input placeholder="keresztév" type="text" id="firstname" name="firstname" required value={registerFormData.firstname} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>E-mail</label>
      <br />
      <input placeholder="példa@gmail.com" type="email" id="email" name="email" required value={registerFormData.email} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Jelszó</label>
      <br />
      <input placeholder="********" type="password" id="password" name="password" required value={registerFormData.password} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Telefonszám</label>
      <br />
      <input type="tel" id="phone" name="phone" placeholder="123-456-7890" required value={registerFormData.phone} onChange={handleChange} />
    </div>
    <button className="register-button" type="submit">Regisztráció</button>
    <br />
    <label>Már van fiókja? Jelentkezzen be <a className="login-link" href="/LoginPage">itt</a></label>
  </form>
</div>
  );
}

export default RegisterPage