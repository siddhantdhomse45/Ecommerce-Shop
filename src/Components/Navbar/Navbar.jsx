import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom"; 
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { FaHeart } from 'react-icons/fa'; 

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, wishlistItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const menuItems = [
    { name: "shop", path: "/" },
    { name: "mens", path: "/mens" },
    { name: "womens", path: "/womens" },
    { name: "kids", path: "/kids" },
    { name: "orders", path: "/orders" },
  ];

  return (
    <nav className='navbar'>
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <p>SHOPPER</p>
      </div>
      
      <ul ref={menuRef} className="nav-menu">
        {menuItems.map(item => (
          <li key={item.name} onClick={() => setMenu(item.name)}>
            <Link to={item.path} className={menu === item.name ? 'active' : ''}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Link>
            {menu === item.name && item.name !== "orders" && <span className="underline"></span>}
          </li>
        ))}
      </ul>

      <div className="nav-login-cart">
        <Link to='/wishlist' className="nav-wishlist-icon">
          <FaHeart />
          {wishlistItems.length > 0 && <span className="nav-cart-count">{wishlistItems.length}</span>}
        </Link>

        <Link to='/cart'>
          <img src={cart_icon} alt="Cart" />
          {getTotalCartItems() > 0 && <span className="nav-cart-count">{getTotalCartItems()}</span>}
        </Link>

        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Dropdown" />
        <Link to='/login'><button>Login</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;
