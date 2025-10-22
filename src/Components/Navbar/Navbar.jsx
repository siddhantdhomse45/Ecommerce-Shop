import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from "react-router-dom";
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { FaHeart } from 'react-icons/fa';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, wishlistItems } = useContext(ShopContext);
  const menuRef = useRef();
  const location = useLocation();

  const menuItems = [
    { name: "shop", path: "/" },
    { name: "mens", path: "/mens" },
    { name: "womens", path: "/womens" },
    { name: "kids", path: "/kids" },
    { name: "orders", path: "/orders" },
  ];

  const dropdown_toggle = () => {
    menuRef.current.classList.toggle('nav-menu-visible');
  };

  const handleMenuClick = (name) => {
    setMenu(name);
    if (menuRef.current.classList.contains('nav-menu-visible')) {
      menuRef.current.classList.remove('nav-menu-visible');
    }
  };

  // Update active menu based on route
  useEffect(() => {
    const path = location.pathname;
    const matched = menuItems.find(item => item.path === path);
    if (matched) setMenu(matched.name);
  }, [location]);

  return (
    <nav className='navbar'>
      {/* Logo */}
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <p>SHOPPER</p>
      </div>

      {/* Navigation Menu */}
      <ul ref={menuRef} className="nav-menu">
        {menuItems.map(item => (
          <li key={item.name} onClick={() => handleMenuClick(item.name)}>
            <Link to={item.path} className={menu === item.name ? 'active' : ''}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Link>
            {menu === item.name && item.name !== "orders" && <span className="underline"></span>}
          </li>
        ))}
      </ul>

      {/* Icons + Login + Mobile Menu */}
      <div className="nav-login-cart">

        {/* Wishlist Icon */}
        <Link to='/wishlist' className="nav-icon">
          <FaHeart />
          {wishlistItems.length > 0 && (
            <span className="nav-cart-count">{wishlistItems.length}</span>
          )}
        </Link>

        {/* Cart Icon */}
        <Link to='/cart' className="nav-icon">
          <img src={cart_icon} alt="Cart" />
          {getTotalCartItems() > 0 && (
            <span className="nav-cart-count">{getTotalCartItems()}</span>
          )}
        </Link>

        {/* Mobile Menu Dropdown Icon */}
        <img
          className='nav-dropdown'
          onClick={dropdown_toggle}
          src={nav_dropdown}
          alt="Dropdown"
        />

        {/* Login Button */}
        <Link to='/login'>
          <button>Login</button>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
