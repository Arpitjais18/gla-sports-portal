// ═══════════════════════════════════════════════════
//  login.js — Connects to your Node.js /login endpoint
//  Backend: http://localhost:5000/login
// ═══════════════════════════════════════════════════

const API = "https://gla-sports-portal.onrender.com";

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const roll     = document.getElementById("roll").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl  = document.getElementById("errorMsg");

  errorEl.style.display = "none";

  // Basic validation
  if (!roll || !password) {
    errorEl.textContent   = "❌ Please enter both Roll No. and Password.";
    errorEl.style.display = "block";
    return;
  }

  try {
    // ── Call YOUR existing Node.js /login route ──
    const res  = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roll, password })
    });

    const data = await res.json();

    if (data.success) {
      // Save user to localStorage (same as your original code)
      localStorage.setItem("user", roll);
      window.location.href = "index.html";
    } else {
      errorEl.textContent   = "❌ Invalid Roll No. or Password. Please try again.";
      errorEl.style.display = "block";
    }

  } catch (err) {
    // ── Fallback: if backend is not running, check against users.json pattern ──
    console.warn("Backend not reachable — trying local fallback.");
    const expectedPassword = "pass" + roll;
    if (password === expectedPassword) {
      localStorage.setItem("user", roll);
      window.location.href = "index.html";
    } else {
      errorEl.textContent   = "❌ Invalid credentials. (Demo: Roll 1001 / pass1001)";
      errorEl.style.display = "block";
    }
  }
});
