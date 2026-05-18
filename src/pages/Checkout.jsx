import {
  collection,
  addDoc
} from "firebase/firestore";

import {
  motion
} from "framer-motion";


import Navbar from "../components/Navbar";

import { db } from "../firebase";

import {
  useCart
} from "../context/CartContext";

import "../App.css";

export default function Checkout() {

  const {

    cart,

    removeFromCart,

    clearCart,

    increaseQuantity,

    decreaseQuantity

  } = useCart();

  const total = cart.reduce(

    (sum,item) =>

      sum + (

        Number(item.price)

        * item.quantity

      ),

    0

  );

  async function placeOrder(){

    try{

      await addDoc(

        collection(db,"orders"),

        {

          items:cart,

          total,

          createdAt:new Date()

        }

      );

      alert(
        "Payment Successful & Order Placed"
      );

      clearCart();

    } catch(error){

      alert(error.message);

    }

  }

  

  const componentProps = {

    email:"customer@email.com",

    amount:total * 100,

    publicKey,

    text:"PAY NOW",

    onSuccess:() => {

      placeOrder();

    },

    onClose:() => {

      alert(
        "Transaction Cancelled"
      );

    }

  };

  return(

    <>

      <Navbar />

      <div className="checkout-page">

        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
        >

          <p className="checkout-mini">
            AxM SECURE CHECKOUT
          </p>

          <h1>
            CHECKOUT
          </h1>

        </motion.div>

        {cart.length === 0 ? (

          <p className="empty">
            Your cart is empty
          </p>

        ) : (

          <>

            <div className="checkout-items">

              {cart.map((item,index) => (

                <motion.div
                  className="checkout-card"
                  key={index}
                  whileHover={{
                    scale:1.01
                  }}
                >

                  <img
                    src={item.image}
                    alt=""
                  />

                  <div className="checkout-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      ₦{item.price}
                    </p>

                    {item.size && (

                      <small>
                        Size: {item.size}
                      </small>

                    )}

                    <div className="quantity-controls">

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id
                          )
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(index)
                    }
                  >
                    REMOVE
                  </button>

                </motion.div>

              ))}

            </div>

            <motion.div
              className="checkout-summary"
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
            >

              <h2>
                TOTAL
              </h2>

              <h1>
                ₦{total}
              </h1>

              <PaystackButton
                className="checkout-btn"
                {...componentProps}
              />

            </motion.div>

          </>

        )}

      </div>

    </>

  )

}