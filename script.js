let cart = [];
let total = 0;
function addToCart(item, price) {
    cart.push({ item, price });
    total += price;

    displayCart();

    
}

function displayCart() {
    let cartList = document.getElementById("cart");
    cartList.innerHTML = "";

    cart.forEach(c => {
        let li = document.createElement("li");
        li.innerText = `${c.item} - ₹${c.price}`;
        cartList.appendChild(li);
    });

    const totalElement = document.getElementById("total");
    totalElement.innerText = Math.round(total);

    // Pulse animation
    totalElement.classList.add("pulse");
    setTimeout(() => totalElement.classList.remove("pulse"), 300);
}


function applyCoupon() {
    let code = document.getElementById("coupon").value.trim().toUpperCase();

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    if (code === "GOLD10") {
        total = total - (total * 0.10);
        alert("10% discount applied!");
    }
    else if (code === "GOLD20") {
        total = total - (total * 0.20);
        alert("20% discount applied!");
    }
    else {
        alert("Invalid Coupon Code");
        return;
    }

    document.getElementById("total").innerText = Math.round(total);
    document.getElementById("coupon").value = "";
}

function animateButton(btn) {
    btn.classList.add("animated-btn");

    setTimeout(() => {
        btn.classList.remove("animated-btn");
    }, 1000);
}

function submitFeedback(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be 10 digits");
        return;
    }

    fetch("http://localhost:5178/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body:
`Email: ${email}
Phone: ${phone}
Message: ${message}`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Server error");
        }
        return response.text();
    })
    .then(() => {
        alert("Feedback submitted successfully!");
        document.getElementById("feedbackForm").reset();
    })
    .catch(() => {
        alert("Error submitting feedback");
    });
}

// TOGGLE CONTACT SECTION--
function toggleContact(box) {
    box.classList.toggle("active");
}

