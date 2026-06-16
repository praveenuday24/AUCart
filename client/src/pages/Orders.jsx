import { useState,useEffect } from "react";
import API from "../api/axios";


const Orders = () =>{
    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        fetchOrders();
    },[]);

    const fetchOrders = async() =>{
        try{
            const response = await API.get("/orders");
            setOrders(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <div>
            <h1>My Orders</h1>
            {orders.map(order =>(
                <div 
                    key={order._id}
                    style={{
                        border: "1px solid gray",
                        margin : "10px",
                        padding : "10px"
                    }}>
                        <h3>Order ID:{order._id}</h3>
                        <p>Amount : ${order.totalAmount}</p>
                        <p>Payment Status: {order.paymentStatus}</p>
                </div>
            ))}
        </div>
    )
}
export default Orders;