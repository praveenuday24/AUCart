
import './App.css'
import { Route,Routes,Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './routes/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'

function App() {

  return (
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
    </Routes>
  )
}

export default App;
