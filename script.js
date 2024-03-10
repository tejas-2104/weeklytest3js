document.addEventListener('DOMContentLoaded', function() {
    const incrementButtons = document.querySelectorAll('.increment-btn');
    const decrementButtons = document.querySelectorAll('.decrement-btn');
    const totalQuantity = document.getElementById('total-quantity');
    const totalCost = document.getElementById('total-cost');
    const cartItems = document.getElementById('cart-items');

    let totalPrice = 0;
    let totalProductCount = 0;
    let cartProducts = {};

    // Add event listeners to increment buttons
    incrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const productId = product.getAttribute('data-id');
            const productPrice = parseInt(product.getAttribute('data-price'));

            let quantity = parseInt(product.querySelector('.quantity').textContent);
            quantity++;
            product.querySelector('.quantity').textContent = quantity;

            totalPrice += productPrice;
            totalProductCount++;

            totalQuantity.textContent = totalProductCount;
            totalCost.textContent = totalPrice;

            // Update or add item to cart
            if (cartProducts[productId]) {
                cartProducts[productId].quantity++;
                cartItems.querySelector(`[data-id="${productId}"]`).textContent = `Product-${productId} - ${productPrice} x ${cartProducts[productId].quantity}`;
            } else {
                cartProducts[productId] = { price: productPrice, quantity: 1 };
                const cartItem = document.createElement('div');
                cartItem.textContent = `Product-${productId} - ${productPrice} x ${cartProducts[productId].quantity}`;
                cartItem.setAttribute('data-id', productId);
                cartItems.appendChild(cartItem);
            }
        });
    });

    // Add event listeners to decrement buttons
    decrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const productId = product.getAttribute('data-id');
            const productPrice = parseInt(product.getAttribute('data-price'));

            let quantity = parseInt(product.querySelector('.quantity').textContent);
            if (quantity > 0) {
                quantity--;
                product.querySelector('.quantity').textContent = quantity;

                totalPrice -= productPrice;
                totalProductCount--;

                totalQuantity.textContent = totalProductCount;
                totalCost.textContent = totalPrice;

                // Update or remove item from cart
                if (cartProducts[productId]) {
                    cartProducts[productId].quantity--;
                    if (cartProducts[productId].quantity === 0) {
                        delete cartProducts[productId];
                        cartItems.removeChild(cartItems.querySelector(`[data-id="${productId}"]`));
                    } else {
                        cartItems.querySelector(`[data-id="${productId}"]`).textContent = `Product-${productId} - ${productPrice} x ${cartProducts[productId].quantity}`;
                    }
                }
            }
        });
    });
});
