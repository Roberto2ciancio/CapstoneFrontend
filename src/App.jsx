import React, { useState } from "react";
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

function App() {
  const [cart, setCart] = useState([]);

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
            <Route path="/shop" element={<Shop products={products} />} />
            <Route
              path="/product/:id"
              element={
                <ProductDetail
                  products={products}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} onRemove={handleRemoveFromCart} />}
            />
            <Route path="/account" element={<Auth />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
