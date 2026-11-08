
import React from "react"
import { Routes, Route } from "react-router-dom"

import Home from './Components/Home'
import Cart from './Components/Cart'
import About from './Components/About'
import Contact from './Components/Contact'
import { CartProvider } from "./Components/CartContext"

function App() {

    return (
        <CartProvider>            
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path='/about' element={<About/>}/> 
                     <Route path='/contact' element={<Contact/>}/> 
                     {/* <Route path='/cart' element={<Cart/>}/>  */}
                    {/* Keep your other existing routes here */}

                </Routes>

            
        </CartProvider>
    )
}

export default App

