import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Layout from './components/Layout';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import Dashboard from './components/Dashboard';
import Suppliers from './components/Suppliers';
import Orders from './components/Orders';
import Customers from './components/Customers';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
            <Route path="register" element={<RedirectIfAuthenticated><Register /></RedirectIfAuthenticated>} />
            <Route path="products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
            <Route path="add-product" element={<PrivateRoute><AddProductForm /></PrivateRoute>} />
            <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="suppliers" element={<PrivateRoute><Suppliers /></PrivateRoute>} />
            <Route path="orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
            <Route path="customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
