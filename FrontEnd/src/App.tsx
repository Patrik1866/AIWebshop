import { useEffect } from 'react';
import Header from './components/headerComponent/Header.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage.tsx';
import HomePage from './pages/homepage/HomePage.tsx';
import RegisterPage from './pages/registerPage/RegisterPage.tsx';
import './style.css';

function App() {

  useEffect(() => {
    
  }, []);
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path='/RegisterPage' element={<RegisterPage/>}></Route>
        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App
