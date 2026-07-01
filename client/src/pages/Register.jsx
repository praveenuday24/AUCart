import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

const Register = () =>{


    const navigate = useNavigate();
    const[formData,setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleInput = (e) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            await API.post(
                "auth/register",
                formData
            );

            toast.success("Registration Successful");
            navigate("login");
        }
        catch(error){
            toast.error(error.response?.data?.message || "Registration Failed");
        }
    }

    return(
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input
                type="name"
                name="name"
                placeholder="Name"
                onChange={handleInput}/>
                <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInput}/>

                <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInput}/>

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;