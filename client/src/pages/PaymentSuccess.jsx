import { Link } from "react-router-dom";

const PaymentSuccess = () =>{
    return(
        <div>
            <h1>Payment Successful</h1>
            <Link to="/orders">View Orders</Link>
        </div>
    )
}

export default PaymentSuccess;