import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const AddProduct = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Upload Image
            const formData = new FormData();
            formData.append("image", image);

            const uploadResponse =
                await API.post(
                    "/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

            const imageUrl =
                uploadResponse.data.imageUrl;

            // Create Product
            await API.post("/seller/products", {
                title,
                description,
                price,
                stock,
                image: imageUrl,
            });

            alert("Product Created");

            navigate("/seller/products");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Add Product</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) =>
                        setStock(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setImage(e.target.files[0])
                    }
                />

                <br /><br />

                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        width="200"
                        alt="Preview"
                    />
                )}

                <br /><br />

                <button type="submit">
                    Add Product
                </button>

            </form>
        </div>
    );
};

export default AddProduct;