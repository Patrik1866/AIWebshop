import React, { useState } from "react";
import './loginPage.css';

 export function LoginPage() {
   const [loginFormData, setLoginFormData] = useState({
     email: "",
     password: "",
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { id, value } = e.target;
     setLoginFormData({ ...loginFormData, [id]: value })
   }

     const handleLogin = async (event: React.FormEvent) => {
       event.preventDefault();
       try {
         const response = await fetch("http://localhost:8080/login", {
           method: "POST",
           headers: {
             "Content-Type": "application/x-www-form-urlencoded",
           },
           body: new URLSearchParams(loginFormData as any).toString(),
         });
         if (response.ok) {
          alert("User logged in successfully");
         } else {
           const errorText = response.text();
           alert(`Failed to login: ${errorText}`);
         }
       } catch (error) {
         alert(`An error occured: ${error}`);
       }
     };

     return (
       <body>
         <div className="loginContainer">
           <h2>Login</h2>
           <form className="loginForm" onSubmit={handleLogin}>
             <div className="form-group">
               <label>E-mail:</label>
               <br />
               <input type="text" id="email" name="email" required value={loginFormData.email} onChange={handleChange}/>
             </div>
             <div className="form-group">
               <label>Password:</label>
               <br />
               <input type="password" id="password" name="password" required value={loginFormData.password} onChange={handleChange}/>
             </div>
             <button type="submit" className="login-button">
               Login
             </button>
             <br />
             <label>
               Don't have a profile yet?<a style={{textDecoration: "underline", color: "#A6A278"}} href="/RegisterPage">Register</a>
             </label>
           </form>
         </div>
       </body>
     );
   };
 

export default LoginPage