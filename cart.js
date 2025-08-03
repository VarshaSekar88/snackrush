const cartSection = document.getElementById("cart-items");
const clearBtn = document.getElementById("clear-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  cartSection.innerHTML = "";

  if (cart.length === 0) {
    cartSection.innerHTML = "<p>Your cart is empty.</p>";
    clearBtn.style.display = "none";
    document.getElementById("cart-total").innerText = "Total: $0.00";
    return;
  }

  clearBtn.style.display = "inline-block";

  let total = 0;

  cart.forEach((item, index) => {
    const priceNumber = typeof item.price === "number" ? item.price : parseFloat(item.price.toString().replace(/[^0-9.]/g, '')) || 0;
    total += priceNumber * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "product-card";
    itemDiv.innerHTML = `
      <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p>Price: $${priceNumber.toFixed(2)}</p>
      <p>Quantity: ${item.quantity}</p>
      <div>
        <button onclick="decreaseQuantity(${index})">-</button>
        <button onclick="increaseQuantity(${index})">+</button>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    cartSection.appendChild(itemDiv);
  });

  document.getElementById("cart-total").innerText = `Total: $${total.toFixed(2)}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");
  cart = [];
  displayCart();
});

displayCart();