import React, { useState } from "react";
import "../css/registerPage.css";
import { User } from "../fields/User";

export function RegisterPage(){
    const [registerFormData, setRegisterFormData] = useState<Omit<User, 'id'>>({
        surname: "",
        firstname: "",
        email: "",
        password:"",
        phone:""
    });

    const handleChange = (e: React  .ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setRegisterFormData({...registerFormData, [id]: value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(registerFormData as any).toString()
            });

            if(response.ok){
                alert("User registered successfully");
            }else{
                const errorText = await response.text();
                alert(`Failed to register user: ${errorText}`);
            }
        }catch(error){
            alert(`An error occured: ${error}`);
        }
    }

    return (
        <div className="registerContainer">
            <h2>Register</h2>
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="form_group">
            <label>Surname:</label><br />
            <input placeholder="example" type="text" id="surname" name="surname" required value={registerFormData.surname} onChange={handleChange}/>
          </div>
          <div className="form_group">
            <label>Firstname:</label><br />
            <input placeholder="example" type="text" id="firstname" name="firstname" required value={registerFormData.firstname} onChange={handleChange}/>
          </div>
          <div className="form_group">
            <label>E-mail:</label><br />
            <input placeholder="example@gmail.com" type="email" id="email" name="email" required value={registerFormData.email} onChange={handleChange}/>
          </div>
          <div className="form_group">
            <label>Password:</label><br />
            <input placeholder="********" type="password" id="password" name="password" required value={registerFormData.password} onChange={handleChange}/>
          </div>
          <div className="form_group">
            <label>Phone:</label><br />
            <input type="tel" id="phone" name="phone" placeholder="123-456-7890" required value={registerFormData.phone} onChange={handleChange}/>
          </div>
          <button className="registerButton" type="submit">Register</button>
        </form>
        </div>
    );
}

export default RegisterPage