import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../App.css";

export default function OrderSuccess() {

  return (

    <div className="success-page">

      <motion.div

        className="success-card"

        initial={{opacity:0,scale:.8}}

        animate={{opacity:1,scale:1}}

        transition={{duration:.6}}

      >

        <div className="success-icon">

          ✓

        </div>

        <h1>

          ORDER RECEIVED

        </h1>

        <p>

          Thank you for choosing AxM.

          <br /><br />

          Your order has been received successfully.

          Once payment is confirmed,

          we'll begin processing it immediately.

        </p>

        <Link
          to="/"
          className="success-btn"
        >

          BACK TO HOME

        </Link>

      </motion.div>

    </div>

  );

}