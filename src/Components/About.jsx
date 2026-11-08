import React, { useState } from 'react'
import "./About.css"
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
    FaRocket
} from "react-icons/fa"

import { FaX } from 'react-icons/fa6'
import { useCart } from "./CartContext"

const About = () => {

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


                <div className="zz"></div>

                            <div className='cbs'>
                              <div>
                                <h1>About <span className="tot">Us</span> </h1>
                              </div>
                            </div>                        

                <div className="kk"></div>


                <div className='vv'>
                  <div>
                    <h2>Who We <span className="tot">Are?</span> </h2>
                    <p>PhoneX is a modern phone store comitted to bringing you <br /> the latest Smartphones at unbeatable prices. We believe in quality, <br /> affordability and excellent customer services.</p>
                  </div>
                </div>

                <div className="pp"></div>


                <div className='fot'>
                  <div className='ebot'>
                    <div>
                        <FaGem/>
                    </div>
                    <div>
                          <h3>Our Mission</h3>
                          <p>To make phones accessible to everyone.......</p>
                    </div>
                  </div>

                  <div className='ebot'>
                    <div>
                        <FaRocket/>
                    </div>
                    <div>
                                  <h3>Our Vison</h3>
                                  <p>To be the trusted phone store worldwide.....</p>
                    </div>
                  </div>

                  <div className='ebot'>
                    <div>
                        <FaHeart/>
                    </div>
                    <div>
                                 <h3>Our Values</h3> 
                                 <p>Honesty, Quality and customer Satisfaction.</p>
                    </div>
                  </div>

                  <div className='ebot'>
                    <div>
                        <FaHandshake/>
                    </div>
                    <div>
                                  <h3>Shop smart. Live Better</h3>
                                  <p>With PhoneX, you're always in good hands.</p>
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

export default About
