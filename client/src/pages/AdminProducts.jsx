import { useEffect, useState } from "react"
import API from "../api/axios";

const AdminProducts = () =>{
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        fetchProducts();
    },[]);

    const fetchProducts = async() =>{
        const response = await API.get("/products");
        setProducts(response.data);
    }

    const deleteProduct = async(id) =>{
        await API.delete(`/products/${id}`);
        fetchProducts();
    }

    return(
        <div>
            <h1>Manage Products</h1>
            {products.map(product => (
                <div key={product._id}>
                    <h3>{product.title}</h3>
                    <button>Edit</button>

                    <button onClick={()=>deleteProduct(product._id)}>Delete</button>
                </div>
            )
            )}
        </div>
    )
}

export default AdminProducts;