import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Products from './Components/Products';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import AddProduct from './Components/AddProduct';
import UpdateProductList from './Components/Update';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product" element={<UpdateProductList />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
