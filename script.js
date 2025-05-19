document.addEventListener("DOMContentLoaded", () => {
  updateNav();
  setupRegisterForm();
  setupLoginForm();
});

function updateNav() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const logoutLink = document.getElementById("logoutLink");

  if (loginLink && registerLink && logoutLink) {
    loginLink.style.display = isLoggedIn ? "none" : "inline";
    registerLink.style.display = isLoggedIn ? "none" : "inline";
    logoutLink.style.display = isLoggedIn ? "inline" : "none";
  }
}

function fakeLogin(email) {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email);
  updateNav();
  alert("Logged in successfully!");
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  updateNav();
  alert("Logged out successfully!");
  window.location.href = "index.html";
}

function setupRegisterForm() {
  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirm = document.getElementById("confirm_password").value.trim();

      if (password !== confirm) {
        alert("Passwords do not match.");
        return;
      }

      localStorage.setItem("registeredEmail", email);
      localStorage.setItem("registeredPassword", password);
      fakeLogin(email);
    });
  }
}

function setupLoginForm() {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const registeredEmail = localStorage.getItem("registeredEmail");
      const registeredPassword = localStorage.getItem("registeredPassword");

      if (!registeredEmail || !registeredPassword) {
        alert("No user registered. Please register first.");
        return;
      }

      if (email === registeredEmail && password === registeredPassword) {
        fakeLogin(email);
      } else {
        alert("Invalid credentials.");
      }
    });
  }
}
