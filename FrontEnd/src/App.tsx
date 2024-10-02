import { useEffect } from 'react'
import Header from './Header.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';

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
