import { useNavigate } from "react-router-dom"
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNotification } from "../context/NotificationContext";

const Payment  = () =>{

    const {addNotification} = useNotification();
    const navigate = useNavigate();
    const handlePayment = async() =>{
        const success = Math.random() > 0.3;
        if(success){
            const order = JSON.parse(
                localStorage.getItem("pendingOrder")
            );
            await API.post("/orders",order);
            localStorage.removeItem("pendingOrder");
            toast.success(
                "Order placed successfully"
            );
            addNotification({
                type: "order",
                message:
                    "Order placed successfully"
            });
            navigate("/Payment-success");
        }
        else{
            toast.error("Payment Failed");
        }
        
        
    }
    return(
        <div>
        <h3>Payment gateway</h3>
        <button onClick={handlePayment}>Pay Now</button>
        </div>
    )
}
export default Payment;
