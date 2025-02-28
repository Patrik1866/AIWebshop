import { useState, useEffect } from "react";
import "../styles/header.css";
import authService from "../util/AuthService";
import { User } from "../entities/User";
import cartService from "../util/CartService";

const Header = () => {
  const [user, setUser] = useState<User | null>(authService.getUser());

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
            <a
              href="/LoginPage"
              className="login-button-header"

            >
              Bejelentkezés
              <i style={{ margin: "0 0 0 0.5em" }} className="fas fa-sign-out-alt"></i>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;