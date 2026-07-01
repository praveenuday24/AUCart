import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const Login = () =>{

    const navigate = useNavigate();

    const {login} = useAuth();
    const [formData,setFormData] = useState({
        email:"",
        password:""
    });


    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await API.post(
                "/auth/login",
                formData
            );

            login(
                response.data.user,
                response.data.token
            )
            let user = response.data.user;
            toast.success("Login Successful");
            if (user.role === "admin") {
                navigate("/admin");
            } else if (user.role === "seller") {
                navigate("/seller/add-product");
            } else {
                navigate("/products");
            }
        }
        catch(error){
            toast.error(error.response?.data?.message || "Login Failed");
        }
    }

    const handleGoogleLogin = async(credentialResponse) =>{
        try{
            const response = await API.post("/auth/google" , {
                credential: credentialResponse.credential
            });
            login(
                response.data.user,
                response.data.token
            );
            let user = response.data.user;
            if (user.role === "admin") {
                navigate("/admin");
            } else if (user.role === "seller") {
                navigate("/seller");
            } else {
                navigate("/products");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}/>

                <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}/>

                <button type="submit">
                    Login
                </button>
            </form>
            <GoogleLogin 
            onSuccess={handleGoogleLogin}
            onError={()=>{
                console.log("Google Login Failed");
            }}></GoogleLogin>
        </div>
    )
}

export default Login;