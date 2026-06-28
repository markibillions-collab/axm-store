import AdminLogin from "./pages/AdminLogin";
import AdminOrders from "./pages/AdminOrders";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";

import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import {
  CartProvider
} from "./context/CartContext";

import Home from "./pages/Home";

import Shop from "./pages/Shop";

import About from "./pages/About";

import Contact from "./pages/Contact";

import Product from "./pages/Product";

import Checkout from "./pages/Checkout";

import Orders from "./pages/Orders";

import Admin from "./Admin";

import "./App.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <CartProvider>

      <BrowserRouter>

        <Toaster

          position="top-right"

          toastOptions={{

            style:{

              background:"#111",

              color:"#fff",

              border:
              "1px solid #5f8d69"

            }

          }}

        />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/shop"
            element={<Shop />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/product/:id"
            element={<Product />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={<Admin />}
          />
          <Route
  path="/payment"
  element={<Payment />}
/>

          <Route
  path="/order-success"
  element={<OrderSuccess />}
/>

<Route

path="/admin-orders"

element={<AdminOrders />}


/>

        </Routes>

      </BrowserRouter>

    </CartProvider>

  </React.StrictMode>

);