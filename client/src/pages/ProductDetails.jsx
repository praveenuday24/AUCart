import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import API from "../api/axios";
import { useCart } from "../context/cartContext";
import { Link } from "react-router-dom";




const ProductDetails = () =>{
    const {id} = useParams();

    const[product,setProduct] = useState(null);
    const  {addToCart} = useCart();

    useEffect(()=>{
        fetchProduct();
    },[]);

    const fetchProduct = async() =>{
        try{
            const response = await API.get(`/products/${id}`);
            setProduct(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

    if(!product){
        return <h2>Loading...</h2>
    }

    return(
        <div>
            <img 
            src={product.image}
            alt={product.title}/>

            <h1>
                {product.title}
            </h1>
            <p>
                {product.description}
            </p>
            <h2>
                ₹{product.price}
            </h2>

            <button
  onClick={() => {
    console.log("clicked");
    addToCart(product);
  }}
>
  Add To Cart
</button>
        </div>
    )
}

export default ProductDetails;