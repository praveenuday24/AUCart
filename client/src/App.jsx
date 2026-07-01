
import './App.css'
import { Route,Routes,Navigate,Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Chat from './pages/Chat';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import NotificationBell from './components/NotificationBell';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import SellerRoute from './components/SellerRoute';
import SellerAnalytics from './pages/SellerAnalytics';
import SellerDashboard from './pages/SellerDashboard';
import SellerOrders from './pages/SellerOrders';
import SellerProducts from './pages/SellerProducts';
import AddProduct from './pages/AddProduct';

function App() {
 
  return (
    <>
    <nav>
        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          Cart
        </Link>

        <Link to="/chat">
          Chat
        </Link>

        <NotificationBell/>
    </nav>

    <Routes>
      <Route 
      path="/"
      element={
        <Navigate to="login"/>
      }/>

      <Route
      path="/login"
      element={<Login/>}
      />

      <Route
      path="register"
      element={<Register/>}/>

      <Route
      path="dashboard"
      element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>

      <Route 
      path="/products" 
      element={<Products/>}/>

      <Route
      path="/products/:id"
      element={<ProductDetails/>}/>

      <Route
      path='/cart'
      element={<Cart/>}/>

      <Route 
      path="/checkout"
      element={<Checkout />}/>

      <Route 
      path='/orders'
      element={
        <ProtectedRoute>
          <Orders/>
        </ProtectedRoute>
      }/>

      <Route 
      path="/chat"
      element={<Chat/>}/>

      <Route
      path="/payment"
      element={<Payment/>}/>

      <Route 
      path="/payment-success"
      element={<PaymentSuccess/>}/>

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard/>
          </AdminRoute>
        }
        />
        <Route
        path="/admin/products"
        element={
            <AdminRoute>
                <AdminProducts />
            </AdminRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
            <AdminRoute>
                <AdminOrders />
            </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
            <AdminRoute>
                <AdminUsers />
            </AdminRoute>
        }
      />
      <Route
      path="/admin/analytics"
      element={
        <AdminRoute>
          <AdminAnalytics/>
        </AdminRoute>
      }/>

      <Route
      path="/seller"
      element={
      <SellerRoute>
      <SellerDashboard/>
      </SellerRoute>
      }
      />

      <Route
      path="/seller/products"
      element={
      <SellerRoute>
      <SellerProducts/>
      </SellerRoute>
      }
      />

      <Route
      path="/seller/orders"
      element={
      <SellerRoute>
      <SellerOrders/>
      </SellerRoute>
      }
      />

      <Route
      path="/seller/analytics"
      element={
      <SellerRoute>
      <SellerAnalytics/>
      </SellerRoute>
      }
      />

      <Route
      path="/seller/add-product"
      element={
        <SellerRoute>
          <AddProduct/>
        </SellerRoute>
      }/>

    </Routes>
    </>
  )
}

export default App;
