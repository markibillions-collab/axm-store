import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  useNavigate,
  useLocation
} from "react-router-dom";
import "../App.css";

export default function Payment() {

  const [search,setSearch] = useState("");

    const navigate = useNavigate();

  const location = useLocation();

const {

  orderNumber,

  fullName,

  phone,

  email,

  state,

  city,

  address,

  cart = [],

  total = 0

} = location.state || {};

  const [copied, setCopied] = useState(false);

  const copyAccount = () => {

  navigator.clipboard.writeText("7067960398");

  setCopied(true);

  setTimeout(() => {

    setCopied(false);

  },2000);

  };

  const whatsappMessage = `🦅 AxM ORDER

━━━━━━━━━━━━━━

CUSTOMER DETAILS

Name:
${fullName}

Phone:
${phone}

Email:
${email}

State:
${state}

City:
${city}

Delivery Address:
${address}

━━━━━━━━━━━━━━

ORDER ITEMS

${cart.map(item =>

`• ${item.name}
Size: ${item.size}
Qty: ${item.quantity}
Price: ₦${item.price}

`).join("")}

━━━━━━━━━━━━━━

TOTAL

₦${Number(total).toLocaleString()}

━━━━━━━━━━━━━━

Payment has been completed.

Proof of payment attached.`;
  const openWhatsApp = () => {

    window.open(

      `https://wa.me/2347067960398?text=${encodeURIComponent(whatsappMessage)}`,

      "_blank"

    );

    navigate("/order-success");

  };
  

  return (

  <div className="payment-page">

    <div className="payment-bg"></div>

    <motion.div
      className="payment-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .8 }}
    >

      <p className="payment-mini">
        AËTOS x MARKI
      </p>

      <h1 className="payment-title">
        COMPLETE PAYMENT
      </h1>

      <div className="payment-line"></div>

      <div className="order-id">

  Order No:
  <strong>{orderNumber}</strong>

</div>

      <h2 className="payment-amount">
         ₦{Number(total).toLocaleString()}
      </h2>

      <p className="payment-sub">
        Transfer the exact amount to the account below.
      </p>

      <div className="bank-card">
        
<div className="order-summary">

  <h2>
    YOUR ORDER
  </h2>

  {cart.map((item, index) => (

    <div
      key={index}
      className="summary-item"
    >

      <img
        src={item.image}
        alt={item.name}
      />

      <div>

        <h4>
          {item.name}
        </h4>

        <p>
          Size: {item.size}
        </p>

        <small>
          Qty: {item.quantity}
        </small>

      </div>

      <span>

        ₦{(
          Number(item.price) *
          item.quantity
        ).toLocaleString()}

      </span>

    </div>

  ))}

  <div className="summary-total">

    <h3>
      TOTAL
    </h3>

    <h2>

      ₦{Number(total).toLocaleString()}

    </h2>

  </div>

</div>
  <div className="bank-top">

    <h3>
      OPAY BANK
    </h3>

    <span>
      SECURED PAYMENT
    </span>

  </div>

  <div className="bank-number">

    7067&nbsp;&nbsp;9603&nbsp;&nbsp;98

  </div>

  <div className="bank-bottom">

    <div>

      <small>
        ACCOUNT NAME
      </small>

      <p>
        Harriet Offor
      </p>

    </div>

    <div>

      <small>
        BANK
      </small>

      <p>
        OPAY
      </p>

    </div>

  </div>

  <button
    className="copy-btn"
    onClick={copyAccount}
  >

    {copied
      ? "✓ COPIED"
      : "COPY ACCOUNT"}

  </button>

</div>

      <div className="payment-note">

        <h3>IMPORTANT</h3>

        <p>
          After making payment,
          click the button below
          and send your payment proof
          via WhatsApp.
        </p>

      </div>

      <button
        className="verify-btn"
        onClick={openWhatsApp}
      >
        ✓ I'VE PAID
      </button>

    </motion.div>

  </div>

  )}