import React, { useState, useEffect } from "react";
import "./App.css";
import { NavBar } from "./Components/NavBar";
import { Footer } from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Components/Home";
import Shop from "./Components/Shop";
import Auth from "./Components/Auth";
import ChiSiamo from "./Components/ChiSiamo";
import ProductDetail from "./Components/ProductDetail";
import Cart from "./Components/Cart";
import products from "./Components/productsData";
import AddPcCard from "./Components/AddPcCard";
import Profile from "./Components/Profile";
import AddPcCardAdmin from "./Components/AddPcCardAdmin";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => setCart([...cart, product]);
  const handleRemoveFromCart = (idx) =>
    setCart(cart.filter((_, i) => i !== idx));

  return (
    <Router>
      <div className="app-container">
        <NavBar cartCount={cart.length} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route
              path="/product/:id"
              element={<ProductDetail onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  setCart={setCart}
                  onRemove={handleRemoveFromCart}
                />
              }
            />
            <Route path="/account" element={<Auth />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/admin/add-pc-card" element={<AddPcCard />} />
            <Route path="/admin/backoffice" element={<AddPcCardAdmin />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
