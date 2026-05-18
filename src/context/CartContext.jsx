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

    setCart((prev) => {

      const existing =
      prev.find(

        (item) =>

          item.id === product.id

      );

      if(existing){

        return prev.map((item) =>

          item.id === product.id

            ? {

                ...item,

                quantity:
                (item.quantity || 1) + 1

              }

            : item

        );

      }

      return [

        ...prev,

        {

          ...product,

          quantity:1

        }

      ];

    });

  }

  function removeFromCart(index){

    const updated = [...cart];

    updated.splice(index,1);

    setCart(updated);

  }

  function increaseQuantity(id){

    setCart((prev) =>

      prev.map((item) =>

        item.id === id

          ? {

              ...item,

              quantity:
              item.quantity + 1

            }

          : item

      )

    );

  }

  function decreaseQuantity(id){

    setCart((prev) =>

      prev.map((item) =>

        item.id === id

          ? {

              ...item,

              quantity:
              item.quantity - 1

            }

          : item

      ).filter(
        (item) => item.quantity > 0
      )

    );

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

        clearCart,

        increaseQuantity,

        decreaseQuantity

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