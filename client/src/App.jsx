
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

    </Routes>
    </>
  )
}

export default App;
