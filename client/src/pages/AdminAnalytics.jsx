import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminAnalytics = () => {
    const [analytics, setAnalytics] = useState({
        users: 0,
        orders: 0,
        revenue: 0
    });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await API.get(
                "/admin/analytics"
            );

            setAnalytics(
                response.data
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>
                Admin Analytics
            </h1>

            <div
                style={{
                    border: "1px solid gray",
                    padding: "10px",
                    margin: "10px"
                }}
            >
                <h3>
                    Total Users
                </h3>

                <p>
                    {analytics.users}
                </p>
            </div>

            <div
                style={{
                    border: "1px solid gray",
                    padding: "10px",
                    margin: "10px"
                }}
            >
                <h3>
                    Total Orders
                </h3>

                <p>
                    {analytics.orders}
                </p>
            </div>

            <div
                style={{
                    border: "1px solid gray",
                    padding: "10px",
                    margin: "10px"
                }}
            >
                <h3>
                    Revenue
                </h3>

                <p>
                    ₹{analytics.revenue}
                </p>
            </div>
        </div>
    );
};

export default AdminAnalytics;