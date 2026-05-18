import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";

import { motion } from "framer-motion";

import {
  useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";

import "../App.css";

export default function Shop() {

  const navigate =
  useNavigate();

  const [products, setProducts] =
  useState([]);

  const [search, setSearch] =
  useState("");

  const [category, setCategory] =
  useState("All");

  useEffect(() => {

    async function fetchProducts() {

      const querySnapshot =
      await getDocs(
        collection(db, "products")
      );

      const productList =
      querySnapshot.docs.map((doc) => ({

        id: doc.id,
        ...doc.data(),

      }));

      setProducts(productList);

    }

    fetchProducts();

  }, []);

  const filteredProducts =
  products.filter((product) => {

    const matchesSearch =

      product.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      );

    const matchesCategory =

      category === "All"

      ||

      product.category === category;

    return (
      matchesSearch &&
      matchesCategory
    );

  });

  return (

    <>

      <Navbar />

      <div className="shop-page">

        <div className="shop-hero">

          <h1>
            AxM SHOP
          </h1>

          <p>
            BUILT ON VISION.
          </p>

          <input
            type="text"
            placeholder="Search AxM Drops..."
            className="search-bar"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="filter-row">

            <button
              onClick={() =>
                setCategory("All")
              }
            >
              ALL
            </button>

            <button
              onClick={() =>
                setCategory("Tees")
              }
            >
              TEES
            </button>

            <button
              onClick={() =>
                setCategory("Hoodies")
              }
            >
              HOODIES
            </button>

            <button
              onClick={() =>
                setCategory("Pants")
              }
            >
              PANTS
            </button>

            <button
              onClick={() =>
                setCategory(
                  "Accessories"
                )
              }
            >
              ACCESSORIES
            </button>

          </div>

        </div>

        <div className="products">

          {filteredProducts.map((product) => (

            <motion.div
              className="card"
              key={product.id}
              whileHover={{
                y:-10
              }}
            >

              <img
                src={product.image}
                alt=""
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
                  onClick={() =>
                    navigate(
                      `/product/${product.id}`
                    )
                  }
                >
                  VIEW PRODUCT
                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </>

  );

}