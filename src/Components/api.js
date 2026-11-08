const API_URL = "https://my-phone-api-x602.onrender.com/api";

// GET PRODUCTS
export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to retrieve products");
    }

    return data.products;
};


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
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to create order");
    }

    return data;
};


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
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Unable to submit payment notification"
        );
    }

    return data;
};