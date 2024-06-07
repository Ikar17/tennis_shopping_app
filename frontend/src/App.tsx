import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LayoutE from './components/Layout/Layout';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import AdminPage from './pages/AdminPage/AdminPage';
import UserPage from './pages/UserPage/UserPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LayoutE />}>
            <Route index element={ <MainPage />} />
            <Route path="login" element={ <SignInPage /> } />
            <Route path="register" element={ <SignUpPage /> } />
            <Route path="products/:category" element={ <ProductsPage /> } />
            <Route path="products/search/:name" element={ <ProductsPage /> } />
            <Route path="admin" element={ <AdminPage /> } />
            <Route path="user" element={ <UserPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
