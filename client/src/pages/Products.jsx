import { useEffect, useState } from "react"
import API from "../api/axios";
import { Link } from "react-router-dom";



const Products = () =>{

    const [products,setProducts] = useState([]);

    useEffect(()=>{
        fetchProducts();
    },[]);

    const fetchProducts = async() =>{
        try{
            const response = await API.get("/products");
            console.log(response);
            setProducts(response.data);
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <div>
            <h1>Products</h1>

            <div>
                {products.map((product) =>(
                    <div 
                    key={product._id}
                    style={{
                        border: "1px solid gray",
                        margin: "10px",
                        padding : "10px"
                    }}>
                        <img 
                            src={product.image}
                            title={product.title}
                            width="200"/>

                        <h3>{product.title}</h3>
                        <p>₹{product.price}</p>
                        <Link to={`/products/${product._id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products;


