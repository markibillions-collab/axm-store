import {
  Link
} from "react-router-dom";

import {
  useState,
  useEffect
} from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import "../App.css";

export default function Navbar({

  user,

  setAuthOpen,

  handleLogout

}) {

  const [menuOpen, setMenuOpen] =
  useState(false);

  const [showNav, setShowNav] =
  useState(true);

  const [lastScroll, setLastScroll] =
  useState(0);

  useEffect(() => {

    function handleScroll(){

      if(

        window.scrollY >

        lastScroll

      ){

        setShowNav(false);

      } else {

        setShowNav(true);

      }

      setLastScroll(
        window.scrollY
      );

    }

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>

      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, [lastScroll]);

  return(

    <>

      {/* ANNOUNCEMENT BAR */}

      <div className="announcement-bar">

        <div className="announcement-track">

          LIMITED DROP LIVE •
          BUILT ON VISION •
          AxM WORLDWIDE •
          NEW COLLECTION AVAILABLE •

        </div>

      </div>

      {/* NAVBAR */}

      <motion.nav

        className="navbar"

        animate={{
          y:showNav ? 0 : -120
        }}

        transition={{
          duration:0.4
        }}

      >

        <Link
          to="/"
          className="logo"
        >

          A<span>x</span>M

        </Link>

        {/* DESKTOP */}

        <div className="nav-links">

          <Link to="/">
            HOME
          </Link>

          <Link to="/shop">
            SHOP
          </Link>

          <Link to="/about">
            ABOUT
          </Link>

          <Link to="/contact">
            CONTACT
          </Link>

          <Link to="/checkout">
            CART
          </Link>

          {

            user ? (

              <button
                className="nav-btn"
                onClick={handleLogout}
              >
                LOGOUT
              </button>

            ) : (

              <button
                className="nav-btn"
                onClick={() =>
                  setAuthOpen(true)
                }
              >
                LOGIN
              </button>

            )

          }

        </div>

        {/* MOBILE BUTTON */}

        <button

          className="menu-btn"

          onClick={() =>
            setMenuOpen(true)
          }

        >

          ☰

        </button>

      </motion.nav>

      {/* MOBILE MENU */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div

            className="mobile-menu"

            initial={{
              opacity:0
            }}

            animate={{
              opacity:1
            }}

            exit={{
              opacity:0
            }}

          >

            <button

              className="close-menu"

              onClick={() =>
                setMenuOpen(false)
              }

            >

              ✕

            </button>

            <Link
              to="/"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              HOME
            </Link>

            <Link
              to="/shop"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              SHOP
            </Link>

            <Link
              to="/about"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              ABOUT
            </Link>

            <Link
              to="/contact"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              CONTACT
            </Link>

            <Link
              to="/checkout"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              CART
            </Link>

            {

              user ? (

                <button
                  className="mobile-auth-btn"
                  onClick={() => {

                    handleLogout();

                    setMenuOpen(false);

                  }}
                >
                  LOGOUT
                </button>

              ) : (

                <button
                  className="mobile-auth-btn"
                  onClick={() => {

                    setAuthOpen(true);

                    setMenuOpen(false);

                  }}
                >
                  LOGIN
                </button>

              )

            }

          </motion.div>

        )}

      </AnimatePresence>

    </>

  )

}