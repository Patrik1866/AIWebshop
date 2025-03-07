import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import "./style.css";
import { ProtectedRoute } from "./util/ProtectedRoute.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import ManageProductsPage from "./pages/ManageProductsPage.tsx";
import GeminiChatPage from "./pages/GeminiChatPage.tsx";
import UnathorizedPage from "./pages/UnauthorizedPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import Header from "./components/Header.tsx";
import ViewProductPage from "./pages/ViewProductPage.tsx";
import authService from "./util/AuthService.ts";
import CartPage from "./pages/CartPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import OrderPage from "./pages/OrderPage.tsx";
import SuccessfulOrderPage from "./pages/SuccessfulOrderPage.tsx";
import ManageOrdersPage from "./pages/ManageOrdersPage.tsx";

function App() {

  const [, setIsAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };

    window.addEventListener('storage', (event) => {
      if (event.key === 'currentUser') {
        handleAuthChange();
      }
    });

    handleAuthChange();

    
    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);



  return (
    <>
      <Header></Header>
      <BrowserRouter>
        <Routes>

          {/* Publikus Elérések */}

          <Route path="/" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />}></Route>
          <Route path="/unauthorized" element={<UnathorizedPage />}></Route>

          {/*Védett elérések */}

          <Route path="/contact"  element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR", "USER"]}>
              <ContactPage />
            </ProtectedRoute>
          }
          ></Route>

          <Route path="/cart" element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR", "USER"]}>
              <CartPage />
            </ProtectedRoute>
          } />

          <Route path="/profil" element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR", "USER"]}>
              <ProfilePage />
            </ProtectedRoute>
          } />

          <Route path="/ViewProductPage" element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR", "USER"]}>
              <ViewProductPage />
            </ProtectedRoute>
          }
          />
          <Route path="/products" element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR", "USER"]}>
              <ProductsPage />
            </ProtectedRoute>
          }
          ></Route>

          <Route path="/chat" element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR", "USER"]}>
              <GeminiChatPage />
            </ProtectedRoute>
          } ></Route>
          <Route path="/order" element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR", "USER"]}>
              <OrderPage />
              </ProtectedRoute>}
            > </Route>

          <Route path="/successfulOrder" element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR", "USER"]}>
              <SuccessfulOrderPage />
            </ProtectedRoute>
          }>

          </Route>

          {/*Admin elérések */}

          <Route path="/manageProducts" element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR"]}>
              <ManageProductsPage />
            </ProtectedRoute>
          }></Route>

          <Route path="/manageProducts/:id" element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR"]}>
              <ManageProductsPage />
            </ProtectedRoute>
          }></Route>

          <Route path="/productList" element={
            <ProtectedRoute roles={["ADMIN"]}>
              <ProductsPage />
            </ProtectedRoute>
          }></Route>

          <Route path="/users" element={<ProtectedRoute roles={["ADMIN"]}>
            <UsersPage/>
          </ProtectedRoute>}>
          </Route>

          <Route path="/manageOrders" element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR"]}>
               <ManageOrdersPage /> 
            </ProtectedRoute>}>
          </Route>


          {/*Admin és moderátor elérések */}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
