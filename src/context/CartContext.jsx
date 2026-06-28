import {

  createContext,
  useContext,
  useState,
  useEffect

} from "react";

const CartContext =
createContext();

export function CartProvider({

  children

}) {

  const [cart, setCart] =

  useState(() => {

    const savedCart =

    localStorage.getItem(
      "axm-cart"
    );

    return savedCart

      ? JSON.parse(savedCart)

      : [];

  });

  useEffect(() => {

    localStorage.setItem(

      "axm-cart",

      JSON.stringify(cart)

    );

  }, [cart]);

  /* ADD */

  function addToCart(product){

    const existing =
    cart.find(

      (item) =>

        item.id === product.id

        &&

        item.size === product.size

    );

    if(existing){

      setCart(

        cart.map((item) =>

          item.id === product.id

          &&

          item.size === product.size

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

    } else {

      setCart([

        ...cart,

        {

          ...product,

          quantity:1

        }

      ]);

    }

  }

  /* REMOVE */

  function removeFromCart(id){

    setCart(

      cart.filter(

        (item) =>

          item.id !== id

      )

    );

  }

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

  /* CLEAR */

  function clearCart(){

    setCart([]);

  }

  return(

    <CartContext.Provider

      value={{

        cart,

        setCart,

        addToCart,

        removeFromCart,

        increaseQty,

        decreaseQty,

        clearCart

      }}

    >

      {children}

    </CartContext.Provider>

  );

}

export function useCart(){

  return useContext(
    CartContext
  );

}