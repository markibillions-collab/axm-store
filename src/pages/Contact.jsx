import { motion } from "framer-motion";
import { useState } from "react";

import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";

import "../App.css";

export default function Contact() {

  const [cartOpen, setCartOpen] =
  useState(false);

  return(

    <>

      <Navbar
        setCartOpen={setCartOpen}
      />

      <div className="contact-page">

        <div className="contact-overlay"></div>

        <motion.div
          className="contact-box"
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
        >

          <p className="contact-mini">
            CONNECT WITH AxM
          </p>

          <h1>
            CONTACT
          </h1>

          <div className="contact-line"></div>

          <p className="contact-text">

            AxM is more than a brand.

            <br /><br />

            It is a vision-driven movement
            built for creators,
            dreamers,
            and future leaders.

            <br /><br />

            Reach out for collaborations,
            partnerships,
            custom drops,
            or inquiries.

          </p>

          <div className="contact-info">

            <div className="contact-card">

              <h3>
                INSTAGRAM
              </h3>

              <p>
                @axmvision
              </p>

            </div>

            <div className="contact-card">

              <h3>
                EMAIL
              </h3>

              <p>
                axmvision@gmail.com
              </p>

            </div>

          </div>

        </motion.div>

      </div>

      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />

    </>

  )

}