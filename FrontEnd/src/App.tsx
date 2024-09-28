import { useEffect } from 'react'
import Header from './Header.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';

function App() {

  useEffect(() => {
    
  }, []);
  return (
    <body>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </body>
  );
}

export default App
