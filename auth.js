document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  // ----- SIGNUP -----
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const pass = document.getElementById("signup-pass").value;
      const confirm = document.getElementById("signup-confirm").value;

      if (pass !== confirm) {
        alert("❌ Passwords do not match.");
        return;
      }

      let users = JSON.parse(localStorage.getItem("snackrush_users")) || [];

      // Prevent duplicate email registration
      if (users.some(u => u.email === email)) {
        alert("❌ Email already registered.");
        return;
      }

      const newUser = { name, email, pass };
      users.push(newUser);

      localStorage.setItem("snackrush_users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", email); // auto-login

      alert(`✅ Welcome, ${name}! Account created.`);
      window.location.href = "index.html";
    });
  }

  // ----- LOGIN -----
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim();
      const pass = document.getElementById("login-pass").value;

      const users = JSON.parse(localStorage.getItem("snackrush_users")) || [];

      const matchedUser = users.find(user => user.email === email && user.pass === pass);

      if (matchedUser) {
        localStorage.setItem("loggedInUser", matchedUser.email);
        alert(`✅ Welcome back, ${matchedUser.name}!`);
        window.location.href = "index.html";
      } else {
        alert("❌ Invalid email or password.");
      }
    });
  }
});
