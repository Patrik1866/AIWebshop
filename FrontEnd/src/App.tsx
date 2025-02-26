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

          <Route path="/chat" element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR", "USER"]}>
              <GeminiChatPage />
            </ProtectedRoute>

          } />

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

          <Route path="productList" element={
            <ProtectedRoute roles={["ADMIN"]}>
              <ProductsPage />
            </ProtectedRoute>
          }>

          </Route>



          {/*Admin és moderátor elérések */}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
