import { useState, useEffect } from "react";
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
    <header className="bg-white shadow-md">
    <nav className="container mx-auto px-4 py-3 items-center justify-center">
      {user ? (
        <div className="flex flex-col md:flex-row md:items-center sm:items-center sm:justify-center md:justify-between">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <div className="p-1">
              <a href="/" className="text-main-green-title hover:text-main-green font-medium">
                Főoldal
              </a>
            </div>
            <div className="p-1">
              <a href="/products" className="text-main-green-title hover:text-main-green font-medium">
                Termékek
              </a>
            </div>
            <div className="p-1">
              <a href="/contact" className="text-main-green-title hover:text-main-green font-medium">
                Kapcsolat
              </a>
            </div>
            <div className="p-1">
              <a href="/chat" className="text-main-green-title hover:text-main-green font-medium">Chat</a>
            </div>
            <div className="p-1">
              <a href={`/viewCustomerOrders/${user.id}`} className="text-main-green-title hover:text-main-green font-medium">Rendeléseim</a>
            </div>
            
            {authService.hasRole(["ADMIN", "MODERATOR"]) && (
              <div className="relative p-1">
                <a
                  href="#"
                  className="text-main-green-title hover:text-main-green font-medium flex items-center justify-center"
                  onClick={toggleDropdown}
                >
                  Admin felületek
                  <span className="ml-2">
                    {dropdownOpen ? (
                      <i className="fas fa-caret-down"></i>
                    ) : <i className="fas fa-caret-up"></i>}
                  </span>
                </a>
                {dropdownOpen && (
                  <div className="absolute flex flex-col text-center items-center justify-center z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <a href="/products" className="block px-4 py-2 text-sm text-main-green-title hover:bg-gray-100">
                      Termékek kezelése
                    </a>
                    <a href="/users" className="block px-4 py-2 text-sm text-main-green-title hover:bg-gray-100">
                      Felhasználók kezelése
                    </a>
                    <a href="/manageOrders" className="block px-4 py-2 text-sm text-gmain-green-title hover:bg-gray-100">
                      Rendelések kezelése
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex md:flex-row justify-center items-center space-x-4 mt-4 md:mt-0">
            <div className="p-2">
              <a href="/cart" className="text-main-green-title hover:text-main-green relative">
                <i className="fas fa-shopping-cart text-xl"></i>
                {cartService.getCartContent() ? (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartService.getCartContent()!.length}
                  </span>
                ) : (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                )}
              </a>
            </div>
            
            <div className="p-2">
              <a href="/profil" className="text-main-green-title hover:text-main-green">
                <i className="fas fa-user text-xl"></i>
              </a>
            </div>
            
            <div className="p-2">
              <a
                href="/"
                className="text-main-green-title hover:text-main-green"
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                }}
              >
                <i className="fas fa-sign-out-alt text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <a href="/LoginPage" className="inline-flex items-center px-4 py-2  bg-main-brown text-main-green-title font-bold rounded-md hover:bg-main-brown-hover transition duration-300">
            Bejelentkezés
            <i className="fas fa-sign-in-alt ml-2"></i>
          </a>
        </div>
      )}
    </nav>
  </header>
  );
};

export default Header;