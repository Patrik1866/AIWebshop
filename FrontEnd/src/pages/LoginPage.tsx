import React from "react";
import '../css/loginPage.css';

 export function LoginPage(){


    return (
      <body>
        <div className="loginContainer">
          <h2>Login</h2>
          <form className="loginForm">
            <div className="form-group">
              <label htmlFor="username_or_email">Username:</label>
              <br />
              <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <br />
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <br />
            <label>Don't have a profile yet?<a href="/Register">Register</a></label>
          </form>
        </div>
      </body>
    );
}

export default LoginPage