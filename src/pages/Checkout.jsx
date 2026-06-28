import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

import {
  useState
} from "react";

import {
  useCart
} from "../context/CartContext";

import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";

import toast from "react-hot-toast";

import "../App.css";

export default function Checkout() {
  
  const navigate = useNavigate();
  
  const [cartOpen, setCartOpen] =
  useState(false);

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

      Number(item.price) *

      item.quantity,

    0

  );
  const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [address, setAddress] = useState("");
const [state, setState] = useState("");
const [city, setCity] = useState("");
const orderNumber = `AXM-${Date.now()}`;

 async function placeOrder(){

  if(

    !fullName ||
    !phone ||
    !email ||
    !state ||
    !city ||
    !address

  ){

    toast.error(
      "Please complete all delivery details."
    );

    return;

  }

  try{

    await addDoc(
  collection(db, "orders"),
  {
    customer: fullName,
    phone,
    email,
    state,
    city,
    address,
    items: cart,
    total,

    status: "Pending Payment",

    createdAt: serverTimestamp()
  }
);

    toast.success(
      "Proceed to Payment"
    );

    navigate("/payment", {

  state: {

    orderNumber,

    fullName,

    phone,

    email,

    state,

    city,

    address,

    cart,

    total

  }

});

  }

  catch(error){

    toast.error(
      "Failed to place order"
    );

    console.log(error);

  }

 

}

  return(

    <>

      <Navbar
        setCartOpen={setCartOpen}
      />

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
                        Size: {item.size}
                      </small>

                      <div className="qty-row">

                        <button
                          onClick={() =>
                            decreaseQty(item.id)
                          }
                        >
                          -
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQty(item.id)
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >

                      REMOVE

                    </button>

                  </div>

                ))}

              </div>

              <div className="checkout-form">

  <h2>DELIVERY DETAILS</h2>

  <input
    type="text"
    placeholder="Full Name"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
  />

  <input
    type="tel"
    placeholder="Phone Number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />

  <input
    type="email"
    placeholder="Email Address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <input
    type="text"
    placeholder="State"
    value={state}
    onChange={(e) => setState(e.target.value)}
  />

  <input
    type="text"
    placeholder="City"
    value={city}
    onChange={(e) => setCity(e.target.value)}
  />

  <textarea
    placeholder="Full Delivery Address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  />

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

      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />

    </>

  )

}