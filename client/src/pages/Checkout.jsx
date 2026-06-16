import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useCart } from "../context/cartContext"

const Checkout = () =>{

    const navigate = useNavigate();
    const {cartItems,total_Price} = useCart();

    const placeOrder = async() => {
        try{
            const payload = {
                products: cartItems.map(item=>({
                    product: item._id,
                    quantity: item.quantity,
                })),
                totalAmount : total_Price
            };

            localStorage.setItem("pendingOrder",JSON.stringify(payload));
            navigate("/payment");
        }
        catch(error){
            alert(error.response?.data?.message);
        }
    };

    return(
        <div>
            <h1>Checkout</h1>
            <h2>Total: ${total_Price}</h2>
            <button onClick={placeOrder}>Pay now</button>
        </div>
    )
};

export default Checkout;