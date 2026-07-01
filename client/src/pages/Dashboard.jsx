import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"



const Dashboard = () =>{
    const {user,logout} = useAuth();
    const navigate = useNavigate();

    const handleAdminClick = () =>{
        navigate("/admin");
    }
    return(
        <div>
            <h1>Welcome, {user?.name}!!</h1>

            <p>Role : {user?.role}</p>

            {user?.role === "admin" &&
                <button onClick={handleAdminClick}> Admin Panel</button>
            }
            
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard;