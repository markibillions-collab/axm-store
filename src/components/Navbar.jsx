import { useCart } from "../context/CartContext";
import "./Navbar.css";

import { useState } from "react";

import {
  FiMenu,
  FiX,
  FiShoppingBag
} from "react-icons/fi";

export default function Navbar({

  setCartOpen,
  user,
  setAuthOpen,
  handleLogout

}) {

  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();

const cartCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
);

  return (

    <>

      {/* TOP NAV */}

      <header className="navbar">

        {/* MENU BUTTON */}

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(true)}
        >
          <FiMenu />
        </button>

        {/* CART BUTTON */}

        {setCartOpen && (

          <button
  className="cart-icon-btn"
  onClick={() => setCartOpen(true)}
>
  <FiShoppingBag />

  {cartCount > 0 && (
    <span className="cart-badge">
      {cartCount}
    </span>
  )}
</button>

        )}

      </header>

      {/* LOGIN BUTTON HIDDEN */}

      {false && (

        user ? (

          <button
            className="auth-btn"
            onClick={handleLogout}
          >
            LOGOUT
          </button>

        ) : (

          <button
            className="auth-btn"
            onClick={() => setAuthOpen(true)}
          >
            LOGIN
          </button>

        )

      )}

      {/* SIDE MENU */}

      <div
        className={
          menuOpen
            ? "side-menu active"
            : "side-menu"
        }
      >

        {/* CLOSE */}

        <button
          className="close-btn"
          onClick={() => setMenuOpen(false)}
        >
          <FiX />
        </button>

        {/* LINKS */}

        <a href="/">
          HOME
        </a>

        <a href="/shop">
          SHOP
        </a>

        <a href="/about">
          ABOUT
        </a>

        <a href="/contact">
          CONTACT
        </a>

      </div>

    </>

  );

}