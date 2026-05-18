import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  collection,
  getDocs
} from "firebase/firestore";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  useCart
} from "../context/CartContext";

import { db } from "../firebase";

import Navbar from "../components/Navbar";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import "../App.css";

export default function Product() {

  const { id } = useParams();

  const navigate =
  useNavigate();

  const { addToCart } =
  useCart();

  const [product, setProduct] =
  useState(null);

  const [related, setRelated] =
  useState([]);

  const [selectedSize, setSelectedSize] =
  useState("M");

  const [activeImage, setActiveImage] =
  useState("");

  useEffect(() => {

    async function fetchProduct() {

      const docRef =
      doc(db, "products", id);

      const docSnap =
      await getDoc(docRef);

      if(docSnap.exists()){

        const productData = {

          id: docSnap.id,

          ...docSnap.data()

        };

        setProduct(productData);

        setActiveImage(

          productData.images?.[0]

          ||

          productData.image

        );

        fetchRelated(
          productData.category
        );

      }

    }

    async function fetchRelated(category){

      const querySnapshot =
      await getDocs(
        collection(db,"products")
      );

      const relatedProducts =
      querySnapshot.docs

      .map((doc) => ({

        id:doc.id,

        ...doc.data()

      }))

      .filter((item) =>

        item.category === category

      )

      .slice(0,4);

      setRelated(
        relatedProducts
      );

    }

    fetchProduct();

  }, [id]);

  if(!product){

    return(

      <h1 className="loading">
        Loading...
      </h1>

    )

  }

  return (

    <>

      <Navbar />

      <div className="luxury-product-page">

        {/* LEFT */}

        <motion.div

          className="luxury-left"

          initial={{
            opacity:0,
            x:-60
          }}

          animate={{
            opacity:1,
            x:0
          }}

        >

          <img
            src={activeImage}
            alt=""
            className="main-product-image"
          />

          <div className="gallery-row">

            {(product.images ||

              [product.image]

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

        </motion.div>

        {/* RIGHT */}

        <motion.div

          className="luxury-right"

          initial={{
            opacity:0,
            x:60
          }}

          animate={{
            opacity:1,
            x:0
          }}

        >

          <p className="luxury-category">
            {product.category}
          </p>

          <h1 className="luxury-title">
            {product.name}
          </h1>

          <p className="luxury-price">
            ₦{product.price}
          </p>

          <p className="luxury-description">
            {product.description}
          </p>

          <div className="size-wrapper">

            <h3>
              SELECT SIZE
            </h3>

            <select

              className="luxury-size"

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

          </div>

          <button

            className="luxury-cart-btn"

            onClick={() => {

              addToCart({

                ...product,

                size:selectedSize

              });

              toast.success(
                "Added To Cart"
              );

            }}

          >

            ADD TO CART

          </button>

          <a

            href={`https://wa.me/2347067960398?text=Hello%20AxM,%20I%20want%20to%20order%20${product.name}`}

            target="_blank"

            rel="noreferrer"

            className="whatsapp-btn"

          >

            ORDER ON WHATSAPP

          </a>

        </motion.div>

      </div>

      {/* RELATED PRODUCTS */}

      <div className="related-section">

        <h2>
          YOU MAY ALSO LIKE
        </h2>

        <div className="products">

          {related.map((item) => (

            <motion.div

              className="card"

              key={item.id}

              whileHover={{
                y:-10
              }}

            >

              <img
                src={item.image}
                alt=""
              />

              <div className="card-content">

                <h3>
                  {item.name}
                </h3>

                <p className="price">
                  ₦{item.price}
                </p>

                <button
                  onClick={() =>
                    navigate(
                      `/product/${item.id}`
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

  )

}