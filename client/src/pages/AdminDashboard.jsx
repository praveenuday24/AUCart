import { Link } from "react-router-dom"

const AdminDashboard = () =>{
    return (
        <div>
            <h1>Admin dashboard</h1>

            <ul>
                <li>
                    <Link to="/admin/Products">
                        Manage Products
                    </Link>
                </li>
                <li>
                    <Link to="/admin/orders">
                        Manage Orders
                    </Link>
                </li>
                <li>
                    <Link to="/admin/users">
                        Manage Users
                    </Link>
                </li>
                <li>
                    <Link to="/admin/analytics">
                        Analytics
                    </Link>
                </li>
            </ul>
        </div>
    )
}
export default AdminDashboard;