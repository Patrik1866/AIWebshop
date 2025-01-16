import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import "./style.css";
import Header from "./components/Header.tsx";
import { AuthProvider } from "./util/AuthContext.tsx";
import { ProtectedRoute } from "./util/ProtectedRoute.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import ManageProductsPage from "./pages/ManageProductsPage.tsx";
import GeminiChatPage from "./pages/GeminiChatPage.tsx";

function App() {

  useEffect(() => {
    if (sessionStorage.getItem("currentUser")) {
      console.log(sessionStorage.getItem("currentUser"));
    }
  }, []);

  return (
    <AuthProvider>
      <Header />
      <BrowserRouter>
        <Routes>

          {/* Publikus Elérések */}

          <Route path="/" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />}></Route>

          {/*Védett elérések */}

          <Route path="/profil" element={
            <ProtectedRoute >
              <ProfilePage />
            </ProtectedRoute>
          } />

          <Route path="/chat" element={
            <ProtectedRoute >
              <GeminiChatPage/>
            </ProtectedRoute>
          
          }/>

          {/*Admin elérések */}

          <Route path="/manageProducts" element={
            <ProtectedRoute roles={["ADMIN"]}>
              <ManageProductsPage/>
            </ProtectedRoute>
          }></Route>

          

          {/*Admin és moderátor elérések */}

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
