import React from "react";
import '../css/loginPage.css';

 export function LoginPage(){
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = (event:React.FormEvent) => {
    event.preventDefault();
    setIsLoggedIn(true);
  }


    return (
      <body>
        <div className="loginContainer">
          <h2>Login</h2>
          <form className="loginForm" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username:</label>
              <br />
              <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <br />
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <br />
            <label>Don't have a profile yet?<a href="/RegisterPage">Register</a></label>
          </form>
        </div>
      </body>
    );
}

export default LoginPage