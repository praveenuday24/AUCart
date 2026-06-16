import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext"


const Cart = () =>{

    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        total_Price
    } = useCart();
    console.log(cartItems);
    return(
        <div>
            <h1>Cart</h1>
            {cartItems.length === 0 ? (
                <h2>Cart is Empty</h2>
            ) : ( 
                <>
                {cartItems.map(item => (
                    <div
                        key={item._id}
                        style={{
                            border:"1px solid gray",
                            margin: "10px",
                            padding: "10px"
                        }}
                    >
                        <h3>{item.title}</h3>
                        <p>${item.price}</p>
                        <input 
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e)=> 
                            updateQuantity(
                                item._id,
                                Number(e.target.value)
                            )}
                        />
                        <button onClick={()=>removeFromCart(item._id)}>Remove</button>
                    </div>
                ))}
                <h2>Total: ${total_Price}</h2>
                <Link to="/checkout"> Proceed To Checkout</Link>
                </>
            )}
        </div>
    )
};

export default Cart;