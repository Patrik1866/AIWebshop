import { useState, useEffect } from "react";
import "../styles/header.css";
import authService from "../util/AuthService";
import { User } from "../entities/User";
import cartService from "../util/CartService";

const Header = () => {
  const [user, setUser] = useState<User | null>(authService.getUser());
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    setUser(authService.getUser());
  }, []);

  return (
    <header className="header">
      <nav className="navbar">
        {user ? (
          <>
            <div className="nav-item">
              <a href="/" className="nav-link">
                Főoldal
              </a>
            </div>
            <div className="nav-item">
              <a href="/products" className="nav-link dropdown-toggle">
                Termékek
              </a>
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
              <div className="dropdown-menu-container">
              <a
                href="#"
                className="nav-link"
                onClick={toggleDropdown}
              >
                Admin felületek
                <div className="arrow-container">
                {dropdownOpen ? (
                  <i className="fas fa-caret-down"></i>
                ): <i className="fas fa-caret-up"></i>}
                </div>
              </a>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <a href="/products" className="dropdown-item">
                    Termékek kezelése
                  </a>
                  <a href="/users" className="dropdown-item">
                    Felhasználók kezelése
                  </a>
                  <a href="/orders" className="dropdown-item">
                    Rendelések kezelése
                  </a>
                </div>
              )}
            </div>
            )}
            <div className="nav-right">
              <div className="nav-item">
                <a href="/cart" className="nav-link">
                  <i className="fas fa-shopping-cart"></i>
                  {cartService.getCartContent()!.length > 0 ? (
                    <span className="cart-count">{cartService.getCartContent()!.length}</span>
                  ) : (
                    <span className="cart-count">0</span>
                  )}
                </a>
              </div>
  
              <div className="nav-item">
                <a href="/profil" className="nav-link">
                  <i className="fas fa-user"></i>
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
                  <i className="fas fa-sign-out-alt"></i>
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="nav-auth">
            <a href="/LoginPage" className="login-button-header">
              Bejelentkezés
              <i style={{ margin: "0 0 0 0.5em" }} className="fas fa-sign-in-alt"></i>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;