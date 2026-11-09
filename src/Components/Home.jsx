import React, { useState, useEffect } from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.png"
import img5 from "../assets/img5.png"
import img6 from "../assets/img6.png"

import {
    FaArrowRight,
    FaFacebook,
    FaHeadset,
    FaInstagram,
    FaShieldAlt,
    FaShoppingCart,
    FaTag,
    FaTruckMoving,
    FaWhatsapp,
    FaBars
} from "react-icons/fa"

import { FaX } from 'react-icons/fa6'
import { useCart } from "./CartContext"
import { getProducts } from "./api"


const Home = () => {
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false)

    // PRODUCTS FROM BACKEND
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // LOCAL PRODUCT IMAGES
    const productImages = {
        "1": img1,
        "2": img2,
        "3": img3,
        "4": img4,
        "5": img5,
        "6": img6
    }

    // CART CONTEXT
    const {
        cartCount,
        addToCart
    } = useCart()


    // FETCH PRODUCTS FROM BACKEND
    useEffect(() => {
        let isMounted = true

        const fetchProducts = async () => {
            try {
                setLoading(true)
                setError("")

                const data = await getProducts()

                if (isMounted) {
                    setProducts(data)
                }

            } catch (err) {
                if (isMounted) {
                    setError(
                        err.message || "Unable to load products. Please try again."
                    )
                }

            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchProducts()

        return () => {
            isMounted = false
        }
    }, []);
    // ADD PRODUCT TO CART
    const handleAddToCart = (product) => {
        const productId = String(product.productId ?? product.id)

        addToCart({
            id: productId,
            name: product.name,
            price: Number(product.price),
            image: product.image || productImages[productId] || img1
        })
    }


    // MOBILE MENU
    const toggleMenu = () => {
        setMenuOpen(prev => !prev)
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }


    return (
        <div>

            <div>

                <div className='wedo'>

                    <div>
                        <h1>Phone<span className='tot'>X</span></h1>
                    </div>

                    <div className='dd'>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </div>

                    <div className='dwq'>
                        <div>
                            <FaFacebook className='gaa'/>
                        </div>

                        <div>
                            <FaInstagram className='gas'/>
                        </div>

                        <div>
                            <FaWhatsapp className='gaf'/>
                        </div>
                    </div>


                    {/* SHOPPING CART WITH NOTIFICATION */}

                    <div className="casd">

                        <Link to="/cart" className="cart-notification">

                            <FaShoppingCart className='jjj'/>

                            {cartCount > 0 && (
                                <span className="cart-count">
                                    {cartCount}
                                </span>
                            )}

                        </Link>

                    </div>


                    {/* MOBILE MENU */}

                    <div className="mobile-menu">

                        <button
                            className="menu-icon"
                            onClick={toggleMenu}
                            type="button"
                        >
                            {menuOpen ? <FaX /> : <FaBars />}
                        </button>

                        <div className={`mobile-nav ${menuOpen ? "active" : ""}`}>

                            <li>
                                <Link to="/about" onClick={closeMenu}>
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link to="/contact" onClick={closeMenu}>
                                    Contact
                                </Link>
                            </li>

                            <li>
                                <Link to="/cart" onClick={closeMenu}>
                                    Cart
                                </Link>
                            </li>

                        </div>

                    </div>

                </div>


                <div className="zz"></div>


                {/* HERO SECTION */}

                <div className="fhs">

                    <div>

                        <h1>Smartphones Made Better</h1>

                        <h3>
                            Discover Technology , <br />
                            Without Limits.
                        </h3>

                        <p className='pta'>Explore the latest Smartphones, <br />
                        experience powerful performance, capture <br />
                        stunning moments, and enjoy innovative <br />
                         feautures designed to keep you ahead.
                        </p>

                        <p className='parat'>From premium iPhones to powerful <br />
                        Android devices, find your perfect match <br /> 
                        at prices you'll love.
                        </p>
                        
                        <h3> <span className='fias'>Quality • Innovation • Affordability</span> </h3>

                        <button onClick={() => navigate("/cart")}>
                            Cart <FaArrowRight/>
                        </button>

                    </div>

                </div>


                <div className="kk"></div>


                {/* SERVICES SECTION */}

                <div className='dvg'>

                    <div className='qq'>

                        <div>
                            <FaTruckMoving className='ee'/>
                        </div>

                        <div>
                            <h5>Fast Delivery</h5>
                        </div>

                    </div>


                    <div className='qq'>

                        <div>
                            <FaHeadset className='ee'/>
                        </div>

                        <div>
                            <h5>24/7 Support</h5>
                        </div>

                    </div>


                    <div className='qq'>

                        <div>
                            <FaShieldAlt className='ee'/>
                        </div>

                        <div>
                            <h5>Secure Payments</h5>
                        </div>

                    </div>

                </div>


                <div className="pp"></div>


                {/* TOP PHONES SECTION */}

                <div className='fre'>

                    <div>

                        <div className='wtu'>

                            <div>
                                <h2>Our Top Phones</h2>
                            </div>

                            <div>
                                <Link to="/cart">
                                    Go to Cart <FaArrowRight/>
                                </Link>
                            </div>

                        </div>


                        <div className='fify'>

                            {/* LOADING */}

                            {loading && (
                                <div className="products-loading">
                                    <h3>Loading phones...</h3>
                                </div>
                            )}


                            {/* ERROR */}

                            {!loading && error && (
                                <div className="products-error">
                                    <h3>{error}</h3>

                                    <button
                                        type="button"
                                        onClick={() => window.location.reload()}
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}


                            {/* EMPTY PRODUCTS */}

                            {!loading && !error && products.length === 0 && (
                                <div className="products-empty">
                                    <h3>No phones available at the moment.</h3>
                                </div>
                            )}


                            {/* PRODUCTS FROM DATABASE */}

                            {!loading && !error && products.map((product) => {

                                const productId = String(
                                    product.productId ?? product.id
                                )

                                const productImage =
                                product.image ||
                                productImages[productId] ||
                                    img1

                                return (

                                    <div className='lbz' key={product._id || productId}>

                                        <div>

                                            <img
                                                src={productImage}
                                                alt={product.name}
                                            />

                                            <h4>{product.name}</h4>

                                            <h3>
                                                ₦{Number(product.price).toLocaleString("en-NG")}
                                            </h3>

                                            <h5>
                                                {product.condition || "Brand new"}
                                            </h5>

                                            <button
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                Add to Cart
                                            </button>

                                        </div>

                                    </div>

                                )
                            })}

                        </div>

                    </div>

                </div>


                <div className="aa"></div>


                {/* DISCOUNT SECTION */}

                <div className='gtb'>

                    <div className='sa'>

                        <div>
                            <FaTag className='ddm'/>
                        </div>

                        <div>
                            <h2>
                                Get <span className='xxx'>10%</span> OFF
                            </h2>

                            <p>On your first order!</p>
                        </div>

                        <div>
                            <Link to="/cart" className="cart-discount-link">
                                Go to Cart <FaShoppingCart className='cfu'/>
                            </Link>
                        </div>

                    </div>

                </div>


                <div className="aa"></div>


                {/* FOOTER */}

                <div className='woe'>

                    <h3>
                        <span className="xxx">&copy; 2026 PhoneX.</span>
                        {" "}All Rights Reserved.
                    </h3>

                </div>


            </div>

        </div>
    )

}

export default Home