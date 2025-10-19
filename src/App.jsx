import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import Wishlist from './Pages/Wishlist';
import Checkout from './Pages/Checkout';
import ScrollToTop from './Components/ScrollToTop';
import Orders from './Pages/Orders';

// ✅ Toastify import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showButton, setShowButton] = useState(false);

  // Show/hide Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        {/* <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path="/product" element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Routes> */}

        <Routes>
  <Route path='/' element={<Shop />} />
  <Route path='/shop' element={<Shop />} /> {/* 👈 Added this line */}
  <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
  <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
  <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
  <Route path="/product" element={<Product />}>
    <Route path=':productId' element={<Product />} />
  </Route>
  <Route path='/cart' element={<Cart />} />
  <Route path='/login' element={<LoginSignup />} />
  <Route path="/wishlist" element={<Wishlist />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/orders" element={<Orders />} />
</Routes>


        {/* ✅ Toast container placed outside Routes so it’s global */}
        <ToastContainer position="top-center" autoClose={2000} />

        <Footer />
      </BrowserRouter>

      {/* Back to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default App;
