import {
  Link
} from "react-router-dom";

import "../App.css";

export default function Footer(){

  return(

    <footer className="luxury-footer">

      <div className="footer-top">

        {/* BRAND */}

        <div className="footer-brand">

          <h1>
            A<span>x</span>M
          </h1>

          <p>

            BUILT ON VISION.

            NOT FOR EVERYONE.

          </p>

        </div>

        {/* LINKS */}

        <div className="footer-links">

          <h3>
            QUICK LINKS
          </h3>

          <Link to="/">
            HOME
          </Link>

          <Link to="/shop">
            SHOP
          </Link>

          <Link to="/about">
            ABOUT
          </Link>

          <Link to="/contact">
            CONTACT
          </Link>

        </div>

        {/* SOCIALS */}

        <div className="footer-socials">

  <h3>
    CONNECT
  </h3>

  <a
    href="https://www.instagram.com/axm.world?igsh=cjQ0b2VucTBtdGIy&utm_source=qr"
    target="_blank"
    rel="noreferrer"
  >
    INSTAGRAM
  </a>

  <a
    href="https://wa.me/2347067960398"
    target="_blank"
    rel="noreferrer"
  >
    WHATSAPP
  </a>

  <a
    href="https://www.tiktok.com/@axm0016?_r=1&_t=ZS-96S3XCj8Lav"
    target="_blank"
    rel="noreferrer"
  >
    TIKTOK
  </a>

    </div>

      </div>

      <div className="footer-bottom">

        © 2026 AxM —
        AËTOS x MARKI

      </div>

    </footer>

  )

}