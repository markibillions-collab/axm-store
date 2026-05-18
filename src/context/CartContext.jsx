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

  function addToCart(product){

    const existing =
    cart.find(

      (item) =>

        item.id === product.id

        &&

        item.size === product.size

    );

    if(existing){

      const updatedCart =
      cart.map((item) =>

        item.id === product.id

        &&

        item.size === product.size

        ? {

            ...item,

            quantity:
            item.quantity + 1

          }

        : item

      );

      setCart(updatedCart);

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

  function removeFromCart(index){

    const updated =
    [...cart];

    updated.splice(index,1);

    setCart(updated);

  }

  function increaseQty(index){

    const updated =
    [...cart];

    updated[index].quantity += 1;

    setCart(updated);

  }

  function decreaseQty(index){

    const updated =
    [...cart];

    if(

      updated[index]
      .quantity > 1

    ){

      updated[index]
      .quantity -= 1;

      setCart(updated);

    }

  }

  function clearCart(){

    setCart([]);

  }

  return(

    <CartContext.Provider

      value={{

        cart,

        addToCart,

        removeFromCart,

        increaseQty,

        decreaseQty,

        clearCart

      }}

    >

      {children}

    </CartContext.Provider>

  )

}

export function useCart(){

  return useContext(
    CartContext
  );

}