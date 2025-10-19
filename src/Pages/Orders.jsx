// src/Components/Order.jsx
import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import "./CSS/Orders.css";

const Order = () => {
  const { orders } = useContext(ShopContext);

  return (
    <div className="order-page">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders">You have not placed any orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>Order #{index + 1}</h3>
            <div className="ordered-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="ordered-product">
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="product-details">
                    <p><strong>{item.name}</strong></p>
                    <p>Size: {item.size || "N/A"}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.new_price}</p>
                    <p>Subtotal: ₹{item.new_price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
