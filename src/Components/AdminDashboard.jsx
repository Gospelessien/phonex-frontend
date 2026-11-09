
import React, { useEffect, useState } from "react"
import "./AdminDashboard.css"

import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSignOutAlt,
    FaMobileAlt,
    FaBox,
    FaTimes,
    FaImage
} from "react-icons/fa"

import {
    getAdminProducts,
    createAdminProduct,
    updateAdminProduct,
    deleteAdminProduct
} from "./api"

const AdminDashboard = () => {

    const [adminKey, setAdminKey] = useState("")
    const [authenticated, setAuthenticated] = useState(false)

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [editingId, setEditingId] = useState(null)

    const [form, setForm] = useState({
        name: "",
        price: "",
        condition: "Brand new",
        image: ""
    })

    // FETCH PRODUCTS

    const fetchProducts = async (key = adminKey) => {

        try {

            setLoading(true)
            setError("")

            const data = await getAdminProducts(key)

            setProducts(data.products || [])

        } catch (err) {

            setError(err.message)

        } finally {

            setLoading(false)

        }

    }


    // ADMIN LOGIN

    const handleLogin = async (e) => {

        e.preventDefault()

        if (!adminKey.trim()) {
            setError("Please enter your admin key")
            return
        }

        try {

            setLoading(true)
            setError("")

            const data = await getAdminProducts(adminKey)

            setProducts(data.products || [])
            setAuthenticated(true)

        } catch (err) {

            setError(err.message)

        } finally {

            setLoading(false)

        }

    }


    // FORM INPUTS

    const handleChange = (e) => {

        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))

    }


    // IMAGE UPLOAD

    const handleImageUpload = (e) => {

        const file = e.target.files?.[0]

        if (!file) return

        if (!file.type.startsWith("image/")) {

            setError("Please select an image file")
            return

        }

        if (file.size > 1.5 * 1024 * 1024) {

            setError("Image must be 1.5MB or smaller")
            e.target.value = ""
            return

        }

        const reader = new FileReader()

        reader.onloadend = () => {

            setForm(prev => ({
                ...prev,
                image: reader.result
            }))

            setError("")

        }

        reader.onerror = () => {
            setError("Unable to read the selected image")
        }

        reader.readAsDataURL(file)

    }


    // RESET FORM

    const resetForm = () => {

        setForm({
            name: "",
            price: "",
            condition: "Brand new",
            image: ""
        })

        setEditingId(null)

        setError("")

    }


    // ADD OR UPDATE PRODUCT

    const handleSubmit = async (e) => {

        e.preventDefault()

        setError("")
        setSuccess("")

        if (!form.name.trim() || form.price === "") {

            setError("Phone name and price are required")
            return

        }

        try {

            setSaving(true)

            const productData = {
                name: form.name,
                price: Number(form.price),
                condition: form.condition,
                image: form.image
            }

            if (editingId) {

                await updateAdminProduct(
                    editingId,
                    productData,
                    adminKey
                )

                setSuccess("Phone updated successfully")

            } else {

                await createAdminProduct(
                    productData,
                    adminKey
                )

                setSuccess("Phone added successfully")

            }

            resetForm()

            await fetchProducts()

        } catch (err) {

            setError(err.message)

        } finally {

            setSaving(false)

        }

    }


    // EDIT PRODUCT

    const handleEdit = (product) => {

        setEditingId(product.productId)

        setForm({
            name: product.name || "",
            price: String(product.price ?? ""),
            condition: product.condition || "Brand new",
            image: product.image || ""
        })

        setError("")
        setSuccess("")

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

    }


    // DELETE PRODUCT

    const handleDelete = async (productId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this phone?"
        )

        if (!confirmed) return

        try {

            setError("")
            setSuccess("")

            await deleteAdminProduct(productId, adminKey)

            setProducts(prev =>
                prev.filter(item => item.productId !== productId)
            )

            if (editingId === productId) {
                resetForm()
            }

            setSuccess("Phone deleted successfully")

        } catch (err) {

            setError(err.message)

        }

    }


    // ADMIN LOGOUT

    const handleLogout = () => {

        setAuthenticated(false)
        setAdminKey("")
        setProducts([])
        resetForm()
        setSuccess("")
        setError("")

    }


    const formatPrice = (price) => {

        return `₦${Number(price).toLocaleString("en-NG")}`

    }


    // ADMIN LOGIN SCREEN

    if (!authenticated) {

        return (

            <div className="admin-login-page">

                <form
                    className="admin-login-card"
                    onSubmit={handleLogin}
                >

                    <h1>Phone<span>X</span></h1>

                    <h2>Admin Login</h2>

                    <p>Enter your admin key to access the dashboard.</p>

                    <input
                        type="password"
                        placeholder="Enter admin key"
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                    />

                    {error && (
                        <p className="admin-error">{error}</p>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? "Checking..." : "Login"}
                    </button>

                </form>

            </div>

        )

    }


    // ADMIN DASHBOARD

    return (

        <div className="admin-dashboard">

            {/* SIDEBAR */}

            <aside className="admin-sidebar">

                <h1>Phone<span>X</span></h1>

                <p>ADMIN PANEL</p>

                <div className="admin-sidebar-link">
                    <FaBox />
                    <span>Products</span>
                </div>

                <button
                    className="admin-logout"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </aside>


            {/* MAIN CONTENT */}

            <main className="admin-main">

                <div className="admin-topbar">

                    <div>
                        <h2>Dashboard</h2>
                        <p>Manage your PhoneX products</p>
                    </div>

                    <div className="admin-user">
                        <FaMobileAlt />
                        <span>Administrator</span>
                    </div>

                </div>


                {/* STATISTICS */}

                <div className="admin-stats">

                    <div className="admin-stat-card">
                        <FaBox />
                        <div>
                            <h3>{products.length}</h3>
                            <p>Total Phones</p>
                        </div>
                    </div>

                </div>


                {/* ADD / EDIT PRODUCT */}

                <section className="admin-form-section">

                    <div className="admin-section-heading">

                        <h2>
                            {editingId ? "Edit Phone" : "Add New Phone"}
                        </h2>

                        {editingId && (

                            <button
                                className="admin-cancel-edit"
                                type="button"
                                onClick={resetForm}
                            >
                                <FaTimes /> Cancel
                            </button>

                        )}

                    </div>


                    <form
                        className="admin-product-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="admin-form-fields">

                            <div className="admin-input-group">

                                <label>Phone Name (h4)</label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. iPhone 17 Pro"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="admin-input-group">

                                <label>Phone Price (h3)</label>

                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Enter price"
                                    min="0"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="admin-input-group">

                                <label>Phone Condition (h5)</label>

                                <input
                                    type="text"
                                    name="condition"
                                    placeholder="Brand new"
                                    value={form.condition}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="admin-input-group">

                                <label>Phone Image</label>

                                <label
                                    className="admin-image-upload"
                                    htmlFor="phone-image"
                                >
                                    <FaImage />
                                    Choose Phone Image
                                </label>

                                <input
                                    id="phone-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />

                            </div>

                        </div>


                        {/* IMAGE PREVIEW */}

                        {form.image && (

                            <div className="admin-image-preview">

                                <img
                                    src={form.image}
                                    alt="Phone preview"
                                />

                                <button
                                    type="button"
                                    onClick={() => setForm(prev => ({
                                        ...prev,
                                        image: ""
                                    }))}
                                >
                                    <FaTimes /> Remove Image
                                </button>

                            </div>

                        )}


                        {error && (
                            <p className="admin-error">{error}</p>
                        )}

                        {success && (
                            <p className="admin-success">{success}</p>
                        )}


                        <button
                            className="admin-submit-btn"
                            type="submit"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Phone"
                                    : <><FaPlus /> Add Phone</>
                            }

                        </button>

                    </form>

                </section>


                {/* PRODUCT LIST */}

                <section className="admin-products-section">

                    <div className="admin-section-heading">

                        <h2>All Phones</h2>

                        <span>{products.length} Products</span>

                    </div>


                    {loading ? (

                        <p className="admin-loading">Loading products...</p>

                    ) : products.length === 0 ? (

                        <p className="admin-empty">
                            No phones have been added yet.
                        </p>

                    ) : (

                        <div className="admin-product-grid">

                            {products.map(product => (

                                <div
                                    className="admin-product-card"
                                    key={product._id || product.productId}
                                >

                                    <div className="admin-product-image">

                                        {product.image ? (

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                            />

                                        ) : (

                                            <FaMobileAlt />

                                        )}

                                    </div>


                                    <div className="admin-product-details">

                                        <h4>{product.name}</h4>

                                        <h3>{formatPrice(product.price)}</h3>

                                        <h5>
                                            {product.condition || "Brand new"}
                                        </h5>

                                        <div className="admin-product-actions">

                                            <button
                                                type="button"
                                                onClick={() => handleEdit(product)}
                                            >
                                                <FaEdit /> Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(product.productId)}
                                            >
                                                <FaTrash /> Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>

    )

}

export default AdminDashboard
