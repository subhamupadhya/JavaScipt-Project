document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "product 1", price: 29.99 },
        { id: 2, name: "product 2", price: 19.99 },
        { id: 3, name: "product 3", price: 59.99 },
    ];

    const cart = [];
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart"); 
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p) => p.id === productId);
            if (product) {
                addToCart(product);
            } else {
                console.error("Product not found!");
            }
        }
    });

    function addToCart(product) {
        cart.push(product);
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = ""; 
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item) => {
                totalPrice += item.price;
                const cartItem = document.createElement("div");
                cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
                cartItems.appendChild(cartItem);
            });
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden"); 
            totalPriceDisplay.textContent = `$0.00`;
        }
    }

    checkOutBtn.addEventListener("click", () => {
        cart.splice(0, cart.length); 
        alert("Checkout successfully");
        renderCart();
    });
});
