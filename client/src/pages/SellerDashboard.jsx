import { Link } from "react-router-dom";

const SellerDashboard = () => {

    return (

        <div>

            <h1>
                Seller Dashboard
            </h1>

            <ul>

                <li>
                    <Link to="/seller/products">
                        My Products
                    </Link>
                </li>

                <li>
                    <Link to="/seller/orders">
                        Orders
                    </Link>
                </li>

                <li>
                    <Link to="/seller/analytics">
                        Analytics
                    </Link>
                </li>

            </ul>

        </div>

    );

}

export default SellerDashboard;