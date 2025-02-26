import React, { Component} from "react";
import '../styles/loginPage.css';
import Notification from "../components/Notification";
import authService from "../util/AuthService";
import { LoginForm } from "../entities/LoginForm";

interface LoginPageProps {

}
interface LoginPageState{
  loginForm: LoginForm;
  showNotifification: boolean;
}

class LoginPage extends Component<LoginPageProps, LoginPageState> {
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {
      loginForm: {
        username: '',
        password: ''
      },
      showNotifification:false
    }

  }
  

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    this.setState({ loginForm: { ...this.state.loginForm, [id]: value }})
  }

  private handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        credentials: 'include',
        body: JSON.stringify(this.state.loginForm)
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

        this.setState({showNotifification:true})

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

  render(){
    return (<>

      <div className="loginContainer">
        <h2>Bejelentkezés</h2>
        <form className="loginForm" onSubmit={this.handleLogin}>
          <div className="form-group">
            <label>Felhasználónév</label>
            <br />
            <input placeholder="Felhasználónév" type="text" id="username" name="username" required value={this.state.loginForm.username} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Jelszó</label>
            <br />
            <input placeholder="Jelszó" type="password" id="password" name="password" required value={this.state.loginForm.password} onChange={this.handleChange} />
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

      {this.state.showNotifification && <Notification message="Sikeres bejelentkezés" />}

    </>
    );
  };
}



export default LoginPage
