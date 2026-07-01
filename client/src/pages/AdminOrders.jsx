import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminOrders = () => {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {

      const response =
        await API.get(
          "/orders/admin"
        );

      setOrders(
        response.data
      );
  };

  return (
    <div>
      <h1>
        All Orders
      </h1>

      {orders.map((order) => (
        <div key={order._id}>
          <p>
            {order.user?.email}
          </p>

          <p>
            $
            {
              order.totalAmount
            }
          </p>

          <p>
            {
              order.orderStatus
            }
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;