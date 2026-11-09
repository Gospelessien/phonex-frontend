const API_URL = "https://my-phone-api-1.onrender.com/api"


// HANDLE API RESPONSE

const handleResponse = async (response) => {

    const contentType = response.headers.get("content-type") || ""

    const responseText = await response.text()

    if (!contentType.includes("application/json")) {

        throw new Error(
            `Backend returned an unexpected response. HTTP Status: ${response.status}`
        )

    }

    let data

    try {

        data = JSON.parse(responseText)

    } catch {

        throw new Error("Backend returned invalid JSON.")

    }

    if (!response.ok) {

        throw new Error(
            data.message || `Request failed: ${response.status}`
        )

    }

    return data

}


// GET PRODUCTS

export const getProducts = async () => {

    const response = await fetch(`${API_URL}/products`)

    const data = await handleResponse(response)

    return data.products

}


// CREATE ORDER

export const createOrder = async (cartItems) => {

    const response = await fetch(`${API_URL}/orders`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            items: cartItems.map(item => ({

                productId: String(item.id),

                quantity: item.quantity

            }))

        })

    })

    return await handleResponse(response)

}


// NOTIFY PAYMENT

export const notifyPayment = async (orderId) => {

    const response = await fetch(

        `${API_URL}/orders/${orderId}/payment-notification`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            }

        }

    )

    return await handleResponse(response)

}


// GET ADMIN ORDERS

export const getAdminOrders = async (adminKey) => {

    const response = await fetch(`${API_URL}/admin/orders`, {

        headers: {

            "x-admin-key": adminKey

        }

    })

    return await handleResponse(response)

}


// UPDATE ADMIN ORDER

export const updateAdminOrder = async (orderId, updates, adminKey) => {

    const response = await fetch(`${API_URL}/admin/orders/${orderId}`, {

        method: "PATCH",

        headers: {

            "Content-Type": "application/json",

            "x-admin-key": adminKey

        },

        body: JSON.stringify(updates)

    })

    return await handleResponse(response)

}


// GET ADMIN PRODUCTS

export const getAdminProducts = async (adminKey) => {

    const response = await fetch(`${API_URL}/admin/products`, {

        headers: {
            "x-admin-key": adminKey
        }

    })

    return await handleResponse(response)

}


// ADD ADMIN PRODUCT

export const createAdminProduct = async (product, adminKey) => {

    const response = await fetch(`${API_URL}/admin/products`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey
        },

        body: JSON.stringify(product)

    })

    return await handleResponse(response)

}


// EDIT ADMIN PRODUCT

export const updateAdminProduct = async (productId, product, adminKey) => {

    const response = await fetch(
        `${API_URL}/admin/products/${productId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "x-admin-key": adminKey
            },

            body: JSON.stringify(product)
        }
    )

    return await handleResponse(response)

}


// DELETE ADMIN PRODUCT

export const deleteAdminProduct = async (productId, adminKey) => {

    const response = await fetch(
        `${API_URL}/admin/products/${productId}`,
        {
            method: "DELETE",

            headers: {
                "x-admin-key": adminKey
            }
        }
    )

    return await handleResponse(response)

}
