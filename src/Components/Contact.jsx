import React, { useState } from 'react'
import "./Contact.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
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
    FaBars,
    FaGem,
    FaHandshake,
    FaHeart,
    FaRocket,
    FaPhone,
    FaEnvelope
} from "react-icons/fa"

import { FaLocationPin, FaX } from 'react-icons/fa6'
import { useCart } from "./CartContext"



const Contact = () => {

const navigate = useNavigate()
  
  
  
  
      const [menuOpen, setMenuOpen] = useState(false)
  
      // CART CONTEXT
      const {
          cartCount,
          addToCart
      } = useCart()
  
  
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
                        <li><Link to="/">Home</Link></li>
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

                <div className="bb"></div>


                <div className='clad'>
                  <div>
                            <h1>Contact <span className="tot">Us</span></h1>
                            <h3>We'd Love to hear from you!</h3>
                  </div>
                </div>

                            <div className="ks"></div>



                            <div className="opw">
                              <div className='nxa'>
                                <div>
                                    <FaPhone/>
                                </div>
                                <div>
                                  <h3>Call us</h3>
                                    <h4>+234 703 393 9849</h4>
                                </div>
                              </div>

                              <div className='nxx'>
                                <div>
                                    <FaEnvelope/>
                                </div>
                                <div>
                                  <h3>Email Us</h3>
                                    <h4>gospelessien@gmail.com</h4>
                                </div>
                              </div>

                              <div className='nxa'>
                                <div>
                                    <FaLocationPin/>
                                </div>
                                <div>
                                    <h3>Our Location</h3>
                                    <h4>Rivers state Nigeria</h4>
                                </div>
                              </div>


                            </div>


                            <div className="aa"></div>


                {/* FOOTER */}

                <div className='woe'>

                    <h3>
                        <span className="xxx">PhoneX &copy;.</span>
                        {" "}All Rights Reserved.
                    </h3>

                </div>

      </div>
    </div>
  )
}

export default Contact
