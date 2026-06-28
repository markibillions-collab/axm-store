import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

import { db } from "../firebase";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import "../App.css";

export default function AdminOrders() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

  const unsubscribe = auth.onAuthStateChanged((currentUser) => {

    setUser(currentUser);
    setLoading(false);

    if (currentUser) {
      fetchOrders();
    }

  });

  return () => unsubscribe();

}, []);

  async function fetchOrders() {

    try {

      const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      setOrders(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );

    } catch (err) {

      console.log(err);
      toast.error("Failed to load orders");

    }

  }

  async function updateStatus(id, status) {

    try {

      await updateDoc(
        doc(db, "orders", id),
        {
          status
        }
      );

      setOrders(current =>
        current.map(order =>
          order.id === id
            ? { ...order, status }
            : order
        )
      );

      toast.success("Status Updated");

    } catch {

      toast.error("Update Failed");

    }

  }

  async function deleteOrder(id) {

    if (!window.confirm("Delete this order?")) return;

    try {

      await deleteDoc(
        doc(db, "orders", id)
      );

      setOrders(current =>
        current.filter(order => order.id !== id)
      );

      toast.success("Order Deleted");

    } catch {

      toast.error("Delete Failed");

    }

  }

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const totalCustomers = new Set(
    orders.map(order => order.phone)
  ).size;

  const filteredOrders = orders.filter(order =>
    (order.customer || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  if (loading) {

  return <h2 style={{ color: "white", textAlign: "center" }}>
    Loading...
  </h2>;

}

if (
  !user ||
  user.email !== "yaribodor1@gmail.com"
) {

  return <Navigate to="/" replace />;

}
  
  return (

    <>

      <Navbar />

      <div className="admin-orders">

        <h1>AXM ORDERS</h1>

        <input
          className="search-orders"
          placeholder="Search customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="admin-stats">

          <div className="stat-box">
            <h3>Revenue</h3>
            <h2>₦{totalRevenue.toLocaleString()}</h2>
          </div>

          <div className="stat-box">
            <h3>Orders</h3>
            <h2>{orders.length}</h2>
          </div>

          <div className="stat-box">
            <h3>Customers</h3>
            <h2>{totalCustomers}</h2>
          </div>

        </div>
                {filteredOrders.map((order) => (

          <div
            key={order.id}
            className="order-card"
          >

            <div className="order-header">

              <h2>
                {order.orderNumber || "AXM ORDER"}
              </h2>

              <span
                className={`status ${(order.status || "Pending Payment")
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                {order.status || "Pending Payment"}
              </span>

            </div>

            <h3>{order.customer}</h3>

            <p>📞 {order.phone}</p>

            <p>📧 {order.email}</p>

            <p>
              📍 {order.address}
              {order.city ? `, ${order.city}` : ""}
              {order.state ? `, ${order.state}` : ""}
            </p>

            <h4>Items</h4>

            {order.items?.map((item, index) => (

              <div
                key={index}
                className="ordered-item"
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>

                  <strong>{item.name}</strong>

                  <p>Size: {item.size}</p>

                  <p>Qty: {item.quantity}</p>

                </div>

              </div>

            ))}

            <h2>
              ₦{Number(order.total).toLocaleString()}
            </h2>

            <div className="order-actions">

              <button
                className="pending-btn"
                onClick={() =>
                  updateStatus(
                    order.id,
                    "Pending Payment"
                  )
                }
              >
                Pending
              </button>

              <button
                className="paid-btn"
                onClick={() =>
                  updateStatus(
                    order.id,
                    "Paid"
                  )
                }
              >
                Paid
              </button>

              <button
                className="processing-btn"
                onClick={() =>
                  updateStatus(
                    order.id,
                    "Processing"
                  )
                }
              >
                Processing
              </button>

              <button
                className="shipped-btn"
                onClick={() =>
                  updateStatus(
                    order.id,
                    "Shipped"
                  )
                }
              >
                Shipped
              </button>

              <button
                className="delivered-btn"
                onClick={() =>
                  updateStatus(
                    order.id,
                    "Delivered"
                  )
                }
              >
                Delivered
              </button>

              <button
                className="delete-order"
                onClick={() =>
                  deleteOrder(order.id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}
              </div>

    </>

  );

}