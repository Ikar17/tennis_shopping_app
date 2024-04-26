import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LayoutE from './components/Layout/Layout';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LayoutE />}>
            <Route index element={ <MainPage />} />
            <Route path="login" element={ <SignInPage /> } />
            <Route path="register" element={ <SignUpPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
