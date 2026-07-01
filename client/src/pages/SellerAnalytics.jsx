import { useEffect, useState } from "react";
import API from "../api/axios";

const SellerAnalytics = () => {
    const [analytics, setAnalytics] = useState({
        totalProducts: 0,
        totalOrders: 0,
        productsSold: 0,
        revenue: 0,
    });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        const response = await API.get("/seller/analytics");
        setAnalytics(response.data);
    };

    return (
        <div>
            <h1>Seller Analytics</h1>

            <div
                style={{
                    border: "1px solid gray",
                    margin: "10px",
                    padding: "10px",
                }}
            >
                <h3>Total Products</h3>
                <p>{analytics.totalProducts}</p>
            </div>

            <div
                style={{
                    border: "1px solid gray",
                    margin: "10px",
                    padding: "10px",
                }}
            >
                <h3>Total Orders</h3>
                <p>{analytics.totalOrders}</p>
            </div>

            <div
                style={{
                    border: "1px solid gray",
                    margin: "10px",
                    padding: "10px",
                }}
            >
                <h3>Products Sold</h3>
                <p>{analytics.productsSold}</p>
            </div>

            <div
                style={{
                    border: "1px solid gray",
                    margin: "10px",
                    padding: "10px",
                }}
            >
                <h3>Total Revenue</h3>
                <p>₹{analytics.revenue}</p>
            </div>
        </div>
    );
};

export default SellerAnalytics;