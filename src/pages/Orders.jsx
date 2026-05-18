import {
  useEffect,
  useState
} from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  motion
} from "framer-motion";

import Navbar from "../components/Navbar";

import { db } from "../firebase";

import "../App.css";

export default function Orders(){

  const [orders,setOrders] =
  useState([]);

  useEffect(() => {

    async function fetchOrders(){

      const querySnapshot =
      await getDocs(
        collection(db,"orders")
      );

      const orderList =
      querySnapshot.docs.map((doc) => ({

        id:doc.id,
        ...doc.data()

      }));

      setOrders(orderList);

    }

    fetchOrders();

  }, []);

  return(

    <>

      <Navbar />

      <div className="orders-page">

        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
        >

          <p className="checkout-mini">
            AxM ORDER DATABASE
          </p>

          <h1>
            ORDERS
          </h1>

        </motion.div>

        {orders.length === 0 ? (

          <p className="empty">
            No Orders Yet
          </p>

        ) : (

          orders.map((order,index) => (

            <motion.div
              className="order-card"
              key={index}
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
            >

              <h2>
                ORDER #{index + 1}
              </h2>

              <p>
                Total:
                ₦{order.total}
              </p>

              <div className="order-items">

                {order.items.map((item,i) => (

                  <div
                    className="order-item"
                    key={i}
                  >

                    <img
                      src={item.image}
                      alt=""
                    />

                    <div>

                      <h4>
                        {item.name}
                      </h4>

                      <p>
                        ₦{item.price}
                      </p>

                      {item.size && (

                        <small>
                          Size: {item.size}
                        </small>

                      )}

                    </div>

                  </div>

                ))}

              </div>

            </motion.div>

          ))

        )}

      </div>

    </>

  )

}