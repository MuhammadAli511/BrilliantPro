import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Cart, ElectronicProducts, Home, JeweleryProducts, LandingPage, Login, MensProducts, NotImplemented, ProductDetail, SignUp, WomensProducts } from "./pages";
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/men-clothing" element={<MensProducts />} />
        <Route path="/women-clothing" element={<WomensProducts />} />
        <Route path="/jewelery" element={<JeweleryProducts />} />
        <Route path="/electronics" element={<ElectronicProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details/:id" element={<ProductDetail/>} />
        <Route path="*" element={<NotImplemented />} />
      </Routes>
    </Router>
  )
}

export default App
