import {
  useCart
} from "../context/CartContext";

import Navbar from "../components/Navbar";

import toast from "react-hot-toast";

import "../App.css";

export default function Checkout() {

  const {

    cart,

    removeFromCart,

    increaseQty,

    decreaseQty,

    clearCart

  } = useCart();

  const total = cart.reduce(

    (sum, item) =>

      sum +

      Number(item.price)

      *

      item.quantity,

    0

  );

  function placeOrder(){

    toast.success(
      "Order Placed Successfully"
    );

    clearCart();

  }

  return (

    <>

      <Navbar />

      <div className="checkout-page">

        <h1>
          CHECKOUT
        </h1>

        {

          cart.length === 0 ? (

            <p className="empty">

              Your cart is empty

            </p>

          ) : (

            <>

              <div className="checkout-items">

                {cart.map((item,index) => (

                  <div
                    className="checkout-card"
                    key={index}
                  >

                    <img
                      src={item.image}
                      alt=""
                    />

                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        ₦{item.price}
                      </p>

                      <small>
                        Size:
                        {item.size}
                      </small>

                      <div className="qty-row">

                        <button
                          onClick={() =>
                            decreaseQty(index)
                          }
                        >
                          -
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQty(index)
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

                  </div>

                ))}

              </div>

              <div className="checkout-summary">

                <h2>
                  TOTAL:
                </h2>

                <h1>
                  ₦{total}
                </h1>

                <button
                  className="checkout-btn"
                  onClick={placeOrder}
                >

                  PLACE ORDER

                </button>

              </div>

            </>

          )

        }

      </div>

    </>

  )

}