import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { cartItems, getTotalCartAmount, isUserLoggedIn, setIsUserLoggedIn } = useContext(StoreContext);

  const handleSignOut = () => {
    setIsUserLoggedIn(false);
    // Logic for sign out, e.g., clearing user data, tokens, etc.
  };

  // Calculate total quantity of items in the cart
  const totalQuantity = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="Logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mob-app")} className={menu === "mob-app" ? "active" : ""}>mobile app</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="Basket" />
          {totalQuantity > 0 && (
            <div className="cart-quantity">
              {totalQuantity}
            </div>
          )}
        </Link>
        {isUserLoggedIn ? (
          <button onClick={handleSignOut}>sign out</button>
        ) : (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar
