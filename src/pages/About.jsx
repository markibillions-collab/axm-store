import { motion } from "framer-motion";
import { useState } from "react";

import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";

import "../App.css";

export default function About() {

  const [cartOpen, setCartOpen] =
  useState(false);

  return(

    <>

      <Navbar
        setCartOpen={setCartOpen}
      />

      <div className="about-page">

        <div className="about-overlay"></div>

        <motion.div
          className="about-box"
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
        >

          <p className="about-mini">
            OUR STORY
          </p>

          <h1>
            BUILT ON VISION
          </h1>

          <div className="about-line"></div>

          <p className="about-text">

            AxM was never created to follow trends.

            <br /><br />

            It was born from vision, hunger,
            sleepless nights, and the belief
            that greatness belongs to the people
            bold enough to chase it.

            <br /><br />

            AËTOS x MARKI represents the mindset
            of those who refuse to stay ordinary.

            <br /><br />

            Every drop is designed for
            visionaries —
            the people building dreams
            nobody else can see yet.

            <br /><br />

            We believe fashion is more than clothing.

            <br /><br />

            It is identity.
            Energy.
            Ambition.
            Presence.

            <br /><br />

            AxM is for the creators,
            the outsiders,
            the future leaders.

          </p>

          <h2 className="about-end">

            NOT FOR EVERYONE.

          </h2>

        </motion.div>

      </div>

      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />

    </>

  )

}