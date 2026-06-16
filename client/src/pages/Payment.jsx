import { useNavigate } from "react-router-dom"
import API from "../api/axios";

const Payment  = () =>{

    const navigate = useNavigate();
    const handlePayment = async() =>{
        const success = Math.random() > 0.3;
        if(success){
            const order = JSON.parse(
                localStorage.getItem("pendingOrder")
            );
            await API.post("/orders",order);
            localStorage.removeItem("pendingOrder");
            navigate("/Payment-success");
        }
        else{
            alert("Payment Failed");
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
