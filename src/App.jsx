
import React from "react"
import { Routes, Route } from "react-router-dom"

import Home from "./Components/Home"
import Cart from "./Components/Cart"
import About from "./Components/About"
import Contact from "./Components/Contact"
import AdminDashboard from "./Components/AdminDashboard"

import { CartProvider } from "./Components/CartContext"

function App() {

    return (

        <CartProvider>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/about" element={<About />} />

                <Route path="/contact" element={<Contact />} />

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

            </Routes>

        </CartProvider>

    )

}

export default App
