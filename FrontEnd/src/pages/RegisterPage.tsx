import React, { useState } from "react";
import { User } from "../entities/User";

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

  return (<>
    <div className="max-w-lg flex flex-col items-center mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <div className="flex flex-row items-center justify-center">
        <h2 className="text-4xl font-bold text-center text-main-green-title mb-5">Regisztráció</h2>
      </div>
      <form className="flex flex-col w-full space-y-4 py-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-main-green-title font-bold mb-2">Felhasználónév</label>
          <input
            className="border border-main-green-title rounded-lg text-main-green-title py-2 px-3 shadow-lg focus:outline-none focus:scale-102 hover:scale-102 transition duration-300 ease-in-out"
            placeholder="felhasználónév" 
            type="text" 
            id="username" 
            name="username" 
            required 
            value={registerFormData.username} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-main-green-title font-bold mb-2">Vezetéknév</label>
          <input
            className="border border-main-green-title rounded-lg text-main-green-title py-2 px-3 shadow-lg focus:outline-none focus:scale-102 hover:scale-102 transition duration-300 ease-in-out"
            placeholder="vezetéknév" 
            type="text" 
            id="surname" 
            name="surname" 
            required 
            value={registerFormData.surname} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-main-green-title font-bold mb-2">Keresztnév</label>
          <input
            className="border border-main-green-title rounded-lg text-main-green-title py-2 px-3 shadow-lg focus:outline-none focus:scale-102 hover:scale-102 transition duration-300 ease-in-out"
            placeholder="keresztév" 
            type="text" 
            id="firstname" 
            name="firstname" 
            required 
            value={registerFormData.firstname} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-main-green-title font-bold mb-2">E-mail</label>
          <input
            className="border border-main-green-title rounded-lg text-main-green-title py-2 px-3 shadow-lg focus:outline-none focus:scale-102 hover:scale-102 transition duration-300 ease-in-out"
            placeholder="példa@gmail.com" 
            type="email" 
            id="email" 
            name="email" 
            required 
            value={registerFormData.email} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-main-green-title font-bold mb-2">Jelszó</label>
          <input
            className="border border-main-green-title rounded-lg text-main-green-title py-2 px-3 shadow-lg focus:outline-none focus:scale-102 hover:scale-102 transition duration-300 ease-in-out"
            placeholder="********" 
            type="password" 
            id="password" 
            name="password" 
            required 
            value={registerFormData.password} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-main-green-title font-bold mb-2">Telefonszám</label>
          <input
            className="border border-main-green-title rounded-lg text-main-green-title py-2 px-3 shadow-lg focus:outline-none focus:scale-102 hover:scale-102 transition duration-300 ease-in-out"
            type="tel" 
            id="phone" 
            name="phone" 
            placeholder="123-456-7890" 
            required 
            value={registerFormData.phone} 
            onChange={handleChange} 
          />
        </div>
        
        <button 
          className="bg-main-brown text-main-green-title bg:hover-main-brown-hover font-bold py-2 px-4 rounded-lg mt-4 shadow-lg hover:opacity-90 transition duration-300 ease-in-out"
          type="submit"
        >
          Regisztráció
        </button>
        
        <p className="text-center mt-4 text-gray-600">
          Már van fiókja? Jelentkezzen be 
          <a className="text-main-green-title font-medium hover:underline ml-1 underline" href="/LoginPage">
            itt
          </a>
        </p>
      </form>
    </div>
    </>
  );
}

export default RegisterPage