
/* LOGIN */

function login() {
    let id = document.getElementById("loginId").value;
    let password = document.getElementById("loginPassword").value;

    if (id.trim() === "" || password.trim() === "") {
        document.getElementById("loginError").innerText =
            "Please enter Login ID and Password";
        return;
    }

    document.getElementById("loginError").innerText = "";
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainPage").style.display = "block";
}

/* LOGOUT */

function logout() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("loginPage").style.display = "flex";

    document.getElementById("loginId").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginError").innerText = "";
}

/* FOOD DATA */

const foods = [
    { id: 1, name: "Chicken Biryani", price: 180, icon: "🍗", available: true },
    { id: 2, name: "Veg Pizza", price: 220, icon: "🍕", available: true },
    { id: 3, name: "Chicken Burger", price: 150, icon: "🍔", available: true },
    { id: 4, name: "Masala Dosa", price: 80, icon: "🥞", available: true },
    { id: 5, name: "Fried Rice", price: 130, icon: "🍚", available: true },
    { id: 6, name: "French Fries", price: 100, icon: "🍟", available: false },
    { id: 7, name: "Mango Juice", price: 70, icon: "🥭", available: true },
    { id: 8, name: "Ice Cream", price: 90, icon: "🍨", available: true }
];

let cart = [];

/* DISPLAY FOOD */

function displayFood(foodArray) {
    let foodList = document.getElementById("foodList");
    foodList.innerHTML = "";

    foodArray.forEach(food => {
        foodList.innerHTML += `
            <div class="food-card">
                <div class="food-icon">${food.icon}</div>
                <h3>${food.name}</h3>
                <div class="price">₹${food.price}</div>

                <div class="${food.available ? "available" : "not-available"}">
                    ${food.available ? "✔ Available" : "✖ Not Available"}
                </div>

                <button onclick="addToCart(${food.id})"
                    ${!food.available ? "disabled" : ""}>
                    Add to Cart
                </button>
            </div>
        `;
    });
}

/* SEARCH FOOD */

function searchFood() {
    let search = document.getElementById("searchBox")
        .value.toLowerCase();

    let result = foods.filter(food =>
        food.name.toLowerCase().includes(search)
    );

    displayFood(result);
}

/* ADD TO CART */

function addToCart(id) {
    let item = cart.find(food => food.id === id);

    if (item) {
        item.quantity++;
    } else {
        let food = foods.find(food => food.id === id);

        cart.push({
            ...food,
            quantity: 1
        });
    }

    updateCart();
    alert("Food added to cart!");
}

/* UPDATE CART */

function updateCart() {
    let cartItems = document.getElementById("cartItems");
    let cartCount = document.getElementById("cartCount");
    let cartTotal = document.getElementById("cartTotal");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartCount.innerText = "0";
        cartTotal.innerText = "0";
        return;
    }

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;

        total += itemTotal;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.icon} ${item.name}</strong>
                    <br>
                    ₹${item.price} each
                </div>

                <div class="quantity">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
    });

    cartCount.innerText = count;
    cartTotal.innerText = total;
}

/* CHANGE QUANTITY */

function changeQuantity(id, change) {
    let item = cart.find(food => food.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(food => food.id !== id);
    }

    updateCart();
}

/* SHOW CART */

function showCart() {
    document.getElementById("cartSection").scrollIntoView({
        behavior: "smooth"
    });
}

/* PLACE ORDER */

function placeOrder() {
    if (cart.length === 0) {
        alert("Please add food to your cart!");
        return;
    }

    let payment = document.querySelector(
        'input[name="payment"]:checked'
    ).value;

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "🎉 Order Confirmed!\n\n" +
        "Total Amount: ₹" + total +
        "\nPayment Method: " + payment +
        "\n\nThank you for ordering from FoodieGo!"
    );

    cart = [];
    updateCart();
}

/* START WEBSITE */

displayFood(foods);
updateCart();
