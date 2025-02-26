import { Component} from "react";
import "../styles/header.css";
import authService from "../util/AuthService";
import { User } from "../entities/User";

interface HeaderProps {

}
interface HeaderState {
  user: User | null;
}

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      user: authService.getUser()

    }
  }

  render() {
    return (
      <header className="header">
        <nav className="navbar">
          {this.state.user ? (
            <>
              <div className="nav-item">
                <a href="/" className="nav-link">
                  Főoldal
                </a>
              </div>
              <div className="nav-item dropdown">
                <a href="/products" className="nav-link dropdown-toggle">
                  Termékek
                </a>
                <div className="dropdown-menu">
                  <a href="/products/category1" className="dropdown-item">
                    Kategória 1
                  </a>
                  <a href="/products/category2" className="dropdown-item">
                    Kategória 2
                  </a>
                  <a href="/products/category3" className="dropdown-item">
                    Kategória 3
                  </a>
                </div>
              </div>
              <div className="nav-item">
                <a href="/contact" className="nav-link">
                  Kapcsolat
                </a>
              </div>
              <div className="nav-item">
                <a href="/chat" className="nav-link">Gemini chat</a>

              </div>
              {authService.hasRole(["ADMIN"]) && (
                <div className="nav-item">
                  <a href="/dashboard" className="nav-link">
                    Kezelőfelület
                  </a>
                </div>
              )}
              {authService.hasRole(["ADMIN", "MODERATOR"]) && (
                <div className="nav-item">
                  <a href="/manageProducts" className="nav-link">Termékek kezelése</a>
                </div>
              )}

              <div className="nav-item">
                <a href="/profil" className="nav-link">
                  Saját profil
                </a>
              </div>
              <div className="nav-auth">
                <a
                  href="/"
                  className="logout-button-header"
                  onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                  }}
                >
                  Kijelentkezés
                  <i style={{ margin: "0 0 0 0.5em" }} className="fas fa-sign-out-alt"></i>
                </a>
              </div>
            </>
          ) : (
            <div className="nav-auth">
              <a 
                href="/"
                className="logout-button-header"
                onClick={() => {
                  authService.logout();
                }}
              >
                Kijelentkezés
                <i style={{margin: "0 0 0 0.5em"}} className="fas fa-sign-out-alt"></i>
              </a>
            </div>
          )}

        </nav>

      </header>
    );
  }
}
export default Header;

