import { useAuth } from "../util/AuthContext";
import "../styles/header.css";

function Header() {
  const { user, hasRole } = useAuth();


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
              <a href="/" className="nav-link">
                Profil
              </a>
            </div>
            {hasRole(["ADMIN"]) && (
              <div className="nav-item">
                <a href="/dashboard" className="nav-link">
                  Kezelőfelület
                </a>
              </div>
            )}

            <div className="nav-item">
              <a href="/profil" className="nav-link">
                Saját profil
              </a>
            </div>


            <div className="nav-item">
              <a
                href="/"
                className="nav-link"
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                }}
              >
                Kijelentkezés
              </a>
            </div>
          </>
        ) : (
          <div className="nav-item" style={{ marginLeft: 'auto', marginRight: '2rem' }}>
            <a href="/LoginPage" className="nav-link">
              Bejelentkezés<i style={{ paddingLeft: '0.2rem' }} className="fas fa-sign-in-alt"></i>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
export default Header;
