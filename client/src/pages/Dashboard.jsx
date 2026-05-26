import { useAuth } from "../context/AuthContext"



const Dashboard = () =>{
    const {user,logout} = useAuth();

    return(
        <div>
            <h1>Welcome, {user?.name}!!</h1>

            <p>Role : {user?.role}</p>

            {user?.role === "admin" &&
                <button> Admin Panel</button>
            }
            
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard;