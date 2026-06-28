import {

  useCart

} from "../context/CartContext";

export default function CartDrawer({

  cartOpen,
  setCartOpen

}){

  const {

    cart,
    setCart

  } = useCart();

  /* INCREASE */

  function increaseQty(id){

    setCart(

      cart.map((item) =>

        item.id === id

        ?

        {

          ...item,

          quantity:
          item.quantity + 1

        }

        :

        item

      )

    );

  }

  /* DECREASE */

  function decreaseQty(id){

    setCart(

      cart

      .map((item) =>

        item.id === id

        ?

        {

          ...item,

          quantity:
          item.quantity - 1

        }

        :

        item

      )

      .filter(
        (item) =>
        item.quantity > 0
      )

    );

  }

  /* TOTAL */

  const subtotal =

  cart.reduce(

    (acc,item) =>

      acc +

      item.price * item.quantity,

    0

  );

  return(

    <>

      {cartOpen && (

        <div className="cart-drawer">

          {/* HEADER */}

          <div className="cart-header">

            <h2>
              YOUR CART
            </h2>

            <button

              className="cart-close"

              onClick={() =>
                setCartOpen(false)
              }

            >

              X

            </button>

          </div>

          {/* EMPTY */}

          {cart.length === 0 ? (

            <p
              style={{
                color:"white"
              }}
            >

              Your cart is empty.

            </p>

          ) : (

            <>

              <div className="cart-items">

                {cart.map((item,index) => (

                  <div

                    className="cart-item"

                    key={index}

                  >

                    <img
                      src={item.image}
                      alt=""
                    />

                    <div
                      className="cart-item-info"
                    >

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        ₦{item.price}
                      </p>

                      <div className="qty-controls">

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

                  </div>

                ))}

              </div>

              {/* FOOTER */}

              <div className="cart-footer">

                <div className="subtotal">

                  <span>
                    SUBTOTAL
                  </span>

                  <span>
                    ₦{subtotal}
                  </span>

                </div>

                <button

  className="checkout-btn"

  onClick={() => {

    window.location.href =
    "/checkout";

  }}

>

  PLACE ORDER

</button>

              </div>

            </>

          )}

        </div>

      )}

    </>

  )

}