 //Add to Cart (Button Clicks)
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button[data-product]");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.product;
      const price = parseFloat(button.dataset.price);
      const image = button.dataset.image || "https://via.placeholder.com/150";

      addToCart(name, price, image);
    });
  });

  updateCartCount();
});

// Core Add to Cart Logic
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1, image });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart! 🛒`);
  updateCartCount();
}

// Cart Icon Count Update
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countSpan = document.getElementById("cart-count");
  if (countSpan) {
    countSpan.textContent = count;
  }
}
<script src="script.js"></script>
// function addToCart(name, price, image) {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   const existing = cart.find(item => item.name === name);
//   if (existing) {
//     existing.quantity += 1;
//   } else {
//     cart.push({ name, price, quantity: 1, image }); // include image here
//   }

//   localStorage.setItem("cart", JSON.stringify(cart));
//   alert(`${name} added to cart!`);
//   updateCartCount();
// }


// function updateCartCount() {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   document.getElementById("cart-count").textContent = cart.length;
// }

// document.querySelectorAll("button").forEach(button => {
//   button.addEventListener("click", () => {
//     const productName = button.previousElementSibling.previousElementSibling.textContent;
//     const productPrice = button.previousElementSibling.textContent;
//     const imgElement = button.parentElement.querySelector("img");
//     const imageUrl = imgElement ? imgElement.getAttribute("src") : "";

//     addToCart(productName, parseFloat(productPrice.replace(/[^0-9.]/g, '')), imageUrl);
//   });
// });
