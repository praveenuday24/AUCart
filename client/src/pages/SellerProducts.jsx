import { useEffect, useState } from "react"
import API from "../api/axios";

const SellerProducts = () => {
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        fetchProducts();
    },[]);

    const fetchProducts = async() => {
        const response = await API.get("/seller/products");
        setProducts(response.data);
    }

    const deleteProduct =  async (id) => {
        await API.delete(`/seller/products/${id}`);
        fetchProducts();
    };

    return(
        <div>
            <h1>My Products</h1>
            {products.map(product => {
                <div
                    key={product._id}
                    style={{
                        border : "1px solid gray",
                        margin: "10px",
                        padding: "10px"
                    }}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <button>Edit</button>
                        <button onClick={()=>{
                            deleteProduct(product._id)
                        }}>
                            Delete
                        </button>
                </div>
            })}
        </div>
    )
}

export default SellerProducts;