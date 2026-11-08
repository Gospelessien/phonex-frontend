import React, { useState } from "react"
import "./Cart.css"
import { Link } from "react-router-dom"
import {
    FaArrowLeft,
    FaTrash,
    FaPlus,
    FaMinus,
    FaShoppingCart,
    FaArrowRight,
    FaTimes,
    FaUniversity,
    FaCopy,
    FaCheck
} from "react-icons/fa"

import { useCart } from "./CartContext"
import { createOrder, notifyPayment } from "./api"

const Cart = () => {

    const {
        cartItems,
        cartCount,
        cartTotal,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart
    } = useCart()

    // PAYMENT POPUP STATE
    const [showPaymentModal, setShowPaymentModal] = useState(false)

    // ACCOUNT NUMBER COPY STATE
    const [copied, setCopied] = useState(false)

    // PAYMENT NOTIFICATION STATE
    const [paymentSubmitted, setPaymentSubmitted] = useState(false)

    // BACKEND STATES
    const [orderId, setOrderId] = useState(null)
    const [creatingOrder, setCreatingOrder] = useState(false)
    const [submittingPayment, setSubmittingPayment] = useState(false)
    const [apiError, setApiError] = useState("")

    // YOUR BANK DETAILS
    const bankName = "GTBank"
    const accountNumber = "0123456789"
    const accountName = "PhoneX Technologies"

    const formatPrice = (price) => {
        return `₦${price.toLocaleString("en-NG")}`
    }

    // CREATE ORDER AND OPEN PAYMENT POPUP
    const openPaymentModal = async () => {

        setPaymentSubmitted(false)
        setCopied(false)
        setApiError("")
        setOrderId(null)

        setCreatingOrder(true)

        try {

            const data = await createOrder(cartItems)

            setOrderId(data.order._id)

            setShowPaymentModal(true)

        } catch (error) {

            setApiError(error.message)

            alert(error.message)

        } finally {

            setCreatingOrder(false)

        }

    }

    // CLOSE PAYMENT POPUP
    const closePaymentModal = () => {

        setShowPaymentModal(false)
        setPaymentSubmitted(false)
        setApiError("")

    }

    // COPY ACCOUNT NUMBER
    const copyAccountNumber = async () => {

        try {

            await navigator.clipboard.writeText(accountNumber)

            setCopied(true)

        } catch (error) {

            alert("Unable to copy. Please copy the account number manually.")

        }

    }

    // SEND PAYMENT NOTIFICATION TO BACKEND
    const handlePaymentSubmitted = async () => {

        if (!orderId) {

            setApiError("Your order has not been created.")

            return

        }

        setSubmittingPayment(true)
        setApiError("")

        try {

            await notifyPayment(orderId)

            setPaymentSubmitted(true)

        } catch (error) {

            setApiError(error.message)

        } finally {

            setSubmittingPayment(false)

        }

    }

    return (
        <div className="cart-page">

            {/* HEADER */}

            <div className="cart-header">

                <Link to="/" className="cart-logo">
                    Phone<span>X</span>
                </Link>

                <div className="cart-header-right">

                    <span>Shopping Cart</span>

                    <div className="cart-header-icon">

                        <FaShoppingCart />

                        {cartCount > 0 && (
                            <span className="cart-header-count">
                                {cartCount}
                            </span>
                        )}

                    </div>

                </div>

            </div>

            <div className="cart-line"></div>


            {/* CART CONTENT */}

            <div className="cart-container">

                <div className="cart-title">

                    <div>

                        <h1>My Shopping Cart</h1>

                        <p>
                            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
                        </p>

                    </div>

                    <Link to="/" className="continue-shopping">
                        <FaArrowLeft />
                        Continue Shopping
                    </Link>

                </div>


                <div className="cart-content">


                    {/* CART PRODUCTS */}

                    <div className="cart-products">

                        <div className="cart-products-heading">

                            <h3>Your Products</h3>

                            {cartItems.length > 0 && (

                                <button onClick={clearCart}>
                                    Clear Cart
                                </button>

                            )}

                        </div>


                        {cartItems.length === 0 ? (

                            <div className="empty-cart">

                                <FaShoppingCart className="empty-cart-icon" />

                                <h2>Your Cart is Empty</h2>

                                <p>
                                    You haven't added any phones to your cart yet.
                                </p>

                                <Link to="/">
                                    Start Shopping <FaArrowRight />
                                </Link>

                            </div>

                        ) : (

                            cartItems.map(item => (

                                <div className="cart-product" key={item.id}>

                                    <div className="cart-product-image">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />

                                    </div>


                                    <div className="cart-product-details">

                                        <h3>{item.name}</h3>

                                        <p className="cart-product-condition">
                                            Brand new
                                        </p>

                                        <h4>
                                            {formatPrice(item.price)}
                                        </h4>

                                        <button
                                            className="remove-mobile"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <FaTrash /> Remove
                                        </button>

                                    </div>


                                    {/* QUANTITY */}

                                    <div className="cart-quantity">

                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <FaMinus />
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() => increaseQuantity(item.id)}
                                        >
                                            <FaPlus />
                                        </button>

                                    </div>


                                    {/* PRODUCT SUBTOTAL */}

                                    <div className="cart-product-subtotal">

                                        <h4>
                                            {formatPrice(item.price * item.quantity)}
                                        </h4>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <FaTrash /> Remove
                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>


                    {/* ORDER SUMMARY */}

                    <div className="cart-summary">

                        <h2>Order Summary</h2>

                        <div className="summary-row">

                            <span>Items ({cartCount})</span>

                            <span>{formatPrice(cartTotal)}</span>

                        </div>


                        <div className="summary-row">

                            <span>Delivery Fee</span>

                            <span>Calculated at checkout</span>

                        </div>


                        <div className="summary-divider"></div>


                        <div className="summary-total">

                            <h3>Total</h3>

                            <h2>{formatPrice(cartTotal)}</h2>

                        </div>


                        {/* PAY NOW BUTTON */}

                        <button
                            className="checkout-btn pay-now-btn"
                            disabled={cartItems.length === 0 || creatingOrder}
                            onClick={openPaymentModal}
                        >

                            {creatingOrder
                                ? "Creating Order..."
                                : "Pay Now"
                            }

                            {!creatingOrder && <FaArrowRight />}

                        </button>


                        {apiError && !showPaymentModal && (

                            <p className="payment-error">
                                {apiError}
                            </p>

                        )}


                        <p className="secure-checkout">
                            <span>🔒</span> Secure and safe shopping
                        </p>

                    </div>

                </div>

            </div>


            {/* FOOTER */}

            <div className="cart-footer">

                <h3>
                    <span>PhoneX ©.</span> All Rights Reserved.
                </h3>

            </div>


            {/* PAYMENT POPUP */}

            {showPaymentModal && (

                <div
                    className="payment-overlay"
                    onClick={closePaymentModal}
                >

                    <div
                        className="payment-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* CLOSE BUTTON */}

                        <button
                            className="payment-close"
                            onClick={closePaymentModal}
                            type="button"
                        >
                            <FaTimes />
                        </button>


                        {/* BANK ICON */}

                        <div className="payment-bank-icon">
                            <FaUniversity />
                        </div>


                        <h2>Make Payment</h2>


                        <p className="payment-instruction">
                            Transfer the total amount to the account
                            below and your order will be confirmed.
                        </p>


                        {/* BANK DETAILS */}

                        <div className="bank-details">

                            <div className="bank-detail-row">

                                <span>Bank Name:</span>

                                <strong>{bankName}</strong>

                            </div>


                            <div className="bank-detail-row account-row">

                                <span>Account Number:</span>

                                <strong className="account-number">
                                    {accountNumber}
                                </strong>

                                <button
                                    className="copy-account"
                                    onClick={copyAccountNumber}
                                    type="button"
                                    title="Copy account number"
                                >
                                    {copied ? <FaCheck /> : <FaCopy />}
                                </button>

                            </div>


                            <div className="bank-detail-row">

                                <span>Account Name:</span>

                                <strong>{accountName}</strong>

                            </div>

                        </div>


                        {/* AMOUNT TO PAY */}

                        <div className="amount-to-pay">

                            <strong>Amount to Pay:</strong>

                            <h3>{formatPrice(cartTotal)}</h3>

                        </div>


                        {/* BACKEND ERROR */}

                        {apiError && (

                            <p className="payment-error">
                                {apiError}
                            </p>

                        )}


                        {/* PAYMENT CONFIRMATION */}

                        {paymentSubmitted ? (

                            <div className="payment-success">

                                <FaCheck />

                                <h3>Payment Notification Submitted</h3>

                                <p>
                                    Thank you. Your transfer still needs
                                    to be verified before your order
                                    can be confirmed.
                                </p>

                                <h5>
                                    Drop your screenshot proof to this whatsapp number (07056795523)
                                </h5>

                                <button
                                    onClick={closePaymentModal}
                                    type="button"
                                >
                                    Close
                                </button>

                            </div>

                        ) : (

                            <button
                                className="payment-confirm-btn"
                                onClick={handlePaymentSubmitted}
                                disabled={submittingPayment}
                                type="button"
                            >

                                <FaCheck />

                                {submittingPayment
                                    ? "Submitting..."
                                    : "I've Made the Payment"
                                }

                            </button>

                        )}

                    </div>

                </div>

            )}

        </div>
    )
}

export default Cart