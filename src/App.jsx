import {
  useCart
} from "./context/CartContext";

import "./App.css";

import { useState, useEffect } from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import toast from "react-hot-toast";

import Navbar from "./components/Navbar";

import {
  auth,
  db
} from "./firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

export default function App() {

  const {
    addToCart
  } = useCart();

  const [selectedProduct, setSelectedProduct] =
  useState(null);

  const [selectedSize, setSelectedSize] =
  useState("M");

  const [activeImage, setActiveImage] =
  useState("");

  const [wishlist, setWishlist] =
  useState([]);

  const [authOpen, setAuthOpen] =
  useState(false);

  const [signup, setSignup] =
  useState(false);

  const [email, setEmail] =
  useState("");

  const [password, setPassword] =
  useState("");

  const [user, setUser] =
  useState(null);

  const [products, setProducts] =
  useState([]);

  const [loadingScreen, setLoadingScreen] =
  useState(true);

  function toggleWishlist(product){

    const exists =
    wishlist.find(

      (item) =>

        item.id === product.id

    );

    if(exists){

      setWishlist(

        wishlist.filter(

          (item) =>

            item.id !== product.id

        )

      );

    } else {

      setWishlist([
        ...wishlist,
        product
      ]);

    }

  }

  async function handleAuth() {

    try {

      if(signup){

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        toast.success(
          "Account Created"
        );

      } else {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        toast.success(
          "Login Successful"
        );

      }

      setAuthOpen(false);

    } catch(error){

      toast.error(
        error.message
      );

    }

  }

  async function handleLogout(){

    await signOut(auth);

    toast.success(
      "Logged Out"
    );

  }

  useEffect(() => {

    const unsubscribe =
    onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

      }
    );

    async function fetchProducts(){

      const querySnapshot =
      await getDocs(
        collection(db,"products")
      );

      const productList =
      querySnapshot.docs.map((doc) => ({

        id:doc.id,
        ...doc.data()

      }));

      setProducts(productList);

    }

    fetchProducts();

    const timer = setTimeout(() => {

      setLoadingScreen(false);

    }, 2500);

    return () => {

      clearTimeout(timer);

      unsubscribe();

    };

  }, []);

  if(loadingScreen){

    return(

      <div className="loading-screen">

        <motion.h1

          className="loading-logo"

          initial={{
            opacity:0,
            scale:0.7
          }}

          animate={{
            opacity:1,
            scale:1
          }}

          transition={{
            duration:1.2
          }}
        >

          A<span>x</span>M

        </motion.h1>

        <motion.p

          className="loading-text"

          initial={{
            opacity:0
          }}

          animate={{
            opacity:1
          }}

          transition={{
            delay:1
          }}
        >

          BUILT ON VISION

        </motion.p>

      </div>

    )

  }

  return(

    <div className="app">

      <Navbar
        user={user}
        setAuthOpen={setAuthOpen}
        handleLogout={handleLogout}
      />

      {/* HERO */}

      <section className="hero">

        <motion.div

          className="hero-logo-text"

          initial={{
            opacity:0,
            scale:0.7
          }}

          animate={{
            opacity:1,
            scale:1
          }}

          transition={{
            duration:1
          }}

        >

          <span className="axm-a">A</span>
          <span className="axm-x">X</span>
          <span className="axm-m">M</span>

        </motion.div>

        <p className="hero-sub">
          AËTOS X MARKI
        </p>

        <motion.p

          className="hero-text"

          initial={{
            opacity:0,
            y:80
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:1
          }}

        >

          BUILT ON VISION.
          NOT FOR EVERYONE.

        </motion.p>

      </section>

      {/* PRODUCTS */}

      <section className="products-section">

        <h2>
          LATEST DROPS
        </h2>

        <div className="products">

          {products.slice(0,2).map((product) => (

            <motion.div

              className="card"

              key={product.id}

              initial={{
                opacity:0,
                y:60
              }}

              whileInView={{
                opacity:1,
                y:0
              }}

              viewport={{
                once:true
              }}

              transition={{
                duration:0.7
              }}

              whileHover={{
                y:-10,
                scale:1.02
              }}

            >

              <button

                className="wishlist-btn"

                onClick={() =>
                  toggleWishlist(product)
                }

              >

                {

                  wishlist.find(
                    (item) =>
                    item.id === product.id
                  )

                  ? "♥"

                  : "♡"

                }

              </button>

              <img
                src={product.image}
                alt=""
                onClick={() => {

                  setSelectedProduct(product);

                  setSelectedSize("M");

                  setActiveImage(

                    product.images?.[0]

                    ||

                    product.image

                  );

                }}
              />

              <div className="card-content">

                <h3>
                  {product.name}
                </h3>

                <p className="price">
                  ₦{product.price}
                </p>

                <small className="product-desc">
                  {product.description}
                </small>

                <button
                  onClick={() => {

                    addToCart({
                      ...product,
                      size:"M"
                    });

                    toast.success(
                      "Added To Cart"
                    );

                  }}
                >
                  ADD TO CART
                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* AUTH MODAL */}

      <AnimatePresence>

        {authOpen && (

          <motion.div
            className="auth-overlay"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
          >

            <motion.div
              className="auth-box"
              initial={{ scale:0.8 }}
              animate={{ scale:1 }}
              exit={{ scale:0.8 }}
            >

              <button
                className="auth-close"
                onClick={() =>
                  setAuthOpen(false)
                }
              >
                X
              </button>

              <h2>
                {signup
                  ? "CREATE ACCOUNT"
                  : "WELCOME BACK"}
              </h2>

              <p className="auth-sub">
                Access the AxM vision.
              </p>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                className="auth-submit"
                onClick={handleAuth}
              >
                {signup
                  ? "SIGN UP"
                  : "LOGIN"}
              </button>

              <p
                className="switch-auth"
                onClick={() =>
                  setSignup(!signup)
                }
              >
                {signup
                  ? "Already have an account?"
                  : "Create account"}
              </p>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* PRODUCT MODAL */}

      <AnimatePresence>

        {selectedProduct && (

          <motion.div
            className="modal-overlay"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
          >

            <motion.div
              className="modal"
              initial={{ scale:0.8 }}
              animate={{ scale:1 }}
              exit={{ scale:0.8 }}
            >

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedProduct(null)
                }
              >
                X
              </button>

              <img
                src={activeImage}
                alt=""
              />

              <div className="gallery-row">

                {(selectedProduct.images ||

                  [selectedProduct.image]

                ).map((img,index) => (

                  <img

                    key={index}

                    src={img}

                    alt=""

                    className="gallery-thumb"

                    onClick={() =>
                      setActiveImage(img)
                    }

                  />

                ))}

              </div>

              <div className="modal-content">

                <h2>
                  {selectedProduct.name}
                </h2>

                <p className="modal-price">
                  ₦{selectedProduct.price}
                </p>

                <p className="modal-desc">
                  {selectedProduct.description}
                </p>

                <select

                  className="size-select"

                  value={selectedSize}

                  onChange={(e) =>
                    setSelectedSize(
                      e.target.value
                    )
                  }

                >

                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>

                </select>

                <button
                  className="modal-btn"
                  onClick={() => {

                    addToCart({

                      ...selectedProduct,

                      size:selectedSize

                    });

                    toast.success(
                      "Added To Cart"
                    );

                  }}
                >
                  ADD TO CART
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      <footer>
        © 2026 AxM — AETOS x MARKI
      </footer>

    </div>

  )

}