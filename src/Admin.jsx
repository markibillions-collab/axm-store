import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

import {
  motion
} from "framer-motion";

import toast from "react-hot-toast";

import { db } from "./firebase";

import "./App.css";

export default function Admin() {

  const [name, setName] =
  useState("");

  const [price, setPrice] =
  useState("");

  const [image, setImage] =
  useState("");

  const [image2, setImage2] =
  useState("");

  const [image3, setImage3] =
  useState("");

  const [description, setDescription] =
  useState("");

  const [category, setCategory] =
  useState("Tees");

  const [products, setProducts] =
  useState([]);

  const [editingId, setEditingId] =
  useState(null);

  const [editName, setEditName] =
  useState("");

  const [editPrice, setEditPrice] =
  useState("");

  const [
    editDescription,
    setEditDescription
  ] = useState("");

  async function fetchProducts() {

    const querySnapshot =
    await getDocs(
      collection(db,"products")
    );

    const productList =
    querySnapshot.docs.map((doc) => ({

      id:doc.id,
      ...doc.data(),

    }));

    setProducts(productList);

  }

  useEffect(() => {

    fetchProducts();

  }, []);

  async function uploadProduct() {

    try {

      await addDoc(
        collection(db,"products"),
        {

          name,

          price,

          image,

          images:[

            image,

            image2,

            image3

          ].filter(Boolean),

          description,

          category

        }
      );

      toast.success(
        "DROP UPLOADED"
      );

      setName("");
      setPrice("");
      setImage("");
      setImage2("");
      setImage3("");
      setDescription("");
      setCategory("Tees");

      fetchProducts();

    } catch(error){

      toast.error(
        error.message
      );

    }

  }

  async function deleteProduct(id){

    await deleteDoc(
      doc(db,"products",id)
    );

    toast.success(
      "PRODUCT DELETED"
    );

    fetchProducts();

  }

  async function updateProduct(id){

    try{

      await updateDoc(

        doc(db,"products",id),

        {

          name:editName,

          price:editPrice,

          description:editDescription

        }

      );

      toast.success(
        "PRODUCT UPDATED"
      );

      setEditingId(null);

      fetchProducts();

    } catch(error){

      toast.error(
        error.message
      );

    }

  }

  return(

    <div className="admin-page">

      <div className="admin-sidebar">

        <h1 className="admin-logo">
          A<span>x</span>M
        </h1>

        <p>
          CONTROL CENTER
        </p>

      </div>

      <div className="admin-main">

        <motion.div
          className="admin-upload"
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
        >

          <h2>
            CREATE NEW DROP
          </h2>

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Main Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Second Image URL"
            value={image2}
            onChange={(e) =>
              setImage2(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Third Image URL"
            value={image3}
            onChange={(e) =>
              setImage3(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option>
              Tees
            </option>

            <option>
              Hoodies
            </option>

            <option>
              Pants
            </option>

            <option>
              Accessories
            </option>

          </select>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          ></textarea>

          <button
            onClick={uploadProduct}
          >

            UPLOAD DROP

          </button>

        </motion.div>

        <div className="admin-products">

          {products.map((product) => (

            <div
              className="admin-product-card"
              key={product.id}
            >

              <img
                src={product.image}
                alt=""
              />

              <div>

                {editingId === product.id ? (

                  <>

                    <input
                      type="text"
                      value={editName}
                      onChange={(e) =>
                        setEditName(
                          e.target.value
                        )
                      }
                    />

                    <input
                      type="text"
                      value={editPrice}
                      onChange={(e) =>
                        setEditPrice(
                          e.target.value
                        )
                      }
                    />

                    <textarea
                      value={editDescription}
                      onChange={(e) =>
                        setEditDescription(
                          e.target.value
                        )
                      }
                    ></textarea>

                    <button
                      onClick={() =>
                        updateProduct(
                          product.id
                        )
                      }
                    >

                      SAVE

                    </button>

                  </>

                ) : (

                  <>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      ₦{product.price}
                    </p>

                    <small>
                      {product.category}
                    </small>

                    <p>
                      {product.description}
                    </p>

                    <button
                      onClick={() => {

                        setEditingId(
                          product.id
                        );

                        setEditName(
                          product.name
                        );

                        setEditPrice(
                          product.price
                        );

                        setEditDescription(
                          product.description
                        );

                      }}
                    >

                      EDIT

                    </button>

                    <button
                      onClick={() =>
                        deleteProduct(
                          product.id
                        )
                      }
                    >

                      DELETE

                    </button>

                  </>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}