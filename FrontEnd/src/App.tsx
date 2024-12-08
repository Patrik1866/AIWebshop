import { useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage.tsx";
import HomePage from "./pages/homepage/HomePage.tsx";
import RegisterPage from "./pages/registerPage/RegisterPage.tsx";
import "./style.css";
import Header from "./components/headerComponent/Header.tsx";

function App() {

  useEffect(() => {
    console.log(sessionStorage.getItem("token"));
  }, []);

  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
