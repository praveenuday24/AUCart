import { useEffect, useState } from "react";
import API from "../api/axios";

const SellerOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await API.get("/seller/orders");
        setOrders(response.data);
    };

    return (
        <div>
            <h1>Seller Orders</h1>

            {orders.map((order) => (
                <div
                    key={order._id}
                    style={{
                        border: "1px solid gray",
                        margin: "10px",
                        padding: "10px",
                    }}
                >
                    <h3>
                        Customer:
                        {" "}
                        {order.user?.name}
                    </h3>

                    <p>
                        Email:
                        {" "}
                        {order.user?.email}
                    </p>

                    <p>
                        Total Amount:
                        ₹{order.totalAmount}
                    </p>

                    <p>
                        Status:
                        {" "}
                        {order.orderStatus}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default SellerOrders;