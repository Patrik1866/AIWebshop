import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage.tsx";
import HomePage from "./pages/homepage/HomePage.tsx";
import RegisterPage from "./pages/registerPage/RegisterPage.tsx";
import "./style.css";
import Header from "./components/headerComponent/Header.tsx";
import { AuthProvider } from "./util/AuthContext.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.tsx";

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
          <Route path="/dashboard" element={
            <ProtectedRoute roles={["ADMIN"]}>
              <DashboardPage />
            </ProtectedRoute>
          } />
          {/*Admin elérések */}

          {/*Admin és moderátor elérések */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
