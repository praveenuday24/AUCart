import { createContext, useState ,useContext,useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) =>{
    const [cartItems,setCartItems] = useState([]);
    useEffect(() => {
        console.log(
            "CART CHANGED",
            cartItems
        );
    }, [cartItems]);
    //Add Item
    const addToCart = (product) =>{
        const index = cartItems.findIndex(item => item._id === product._id);

        if(index > -1 ){
            const updatedCart = [...cartItems];
            updatedCart[index] = {
                ...updatedCart[index],
                quantity: updatedCart[index].quantity + 1,
            };

            setCartItems(updatedCart);
        }else{
            console.log(product);
            setCartItems([
                ...cartItems,
                {
                    ...product,
                    quantity : 1
                },
            ]);
        }
    }
    //Remove Item
    const removeFromCart = (productId) =>{
        setCartItems(cartItems.filter(item => item._id !== productId));
    }

    //Update Item
    const updateQuantity = (productId,quantity) => {
        setCartItems( 
            cartItems.map(item => 
                item._id === productId ? {...item, quantity} : item)
        )
    };

    //Total_Price
    const total_Price = cartItems.reduce((acc,item) => acc+item.price * item.quantity , 0);
    return <CartContext.Provider 
        value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            total_Price
        }} >
        {children}
    </CartContext.Provider>
}

export const useCart = () =>{
    return useContext(CartContext);
}