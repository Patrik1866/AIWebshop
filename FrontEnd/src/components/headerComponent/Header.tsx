import './header.css';

function Header() {

    return (
        <header className="header">
            <nav className="navbar">
                <div className="nav-item">
                    <a href="/" className="nav-link">Főoldal</a>
                </div>
                <div className="nav-item dropdown">
                    <a href="/products" className="nav-link dropdown-toggle">Termékek</a>
                    <div className="dropdown-menu">
                        <a href="/products/category1" className="dropdown-item">Kategória 1</a>
                        <a href="/products/category2" className="dropdown-item">Kategória 2</a>
                        <a href="/products/category3" className="dropdown-item">Kategória 3</a>
                    </div>
                </div>
                <div className="nav-item">
                    <a href="/contact" className="nav-link">Kapcsolat</a>
                </div>
                <div className="nav-item">
                    <a href="/" className="nav-link">Profil</a>
                </div>
                <div className='nav-item'>
                    <a href="/LoginPage" className='nav-link'>Login</a>
                </div>
            </nav>
        </header>
    )
}
export default Header