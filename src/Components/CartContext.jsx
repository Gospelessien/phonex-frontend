
import React, { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("phonex-cart")) || []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem("phonex-cart", JSON.stringify(cartItems))
    }, [cartItems])

    // Add product to cart
    const addToCart = (product) => {
        setCartItems(prev => {
            const existingProduct = prev.find(item => item.id === product.id)

            if (existingProduct) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...prev, { ...product, quantity: 1 }]
        })
    }

    // Increase quantity
    const increaseQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        )
    }

    // Decrease quantity
    const decreaseQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        )
    }

    // Remove product
    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    // Clear cart
    const clearCart = () => {
        setCartItems([])
    }

    // Total number of products
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity, 0
    )

    // Total price
    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity, 0
    )

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            cartTotal,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
