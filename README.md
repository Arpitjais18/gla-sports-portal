# 🏆 SportsFest 2026 — GLA University Sports Portal
### Mini Project | Node.js + MongoDB + HTML/CSS/JS

---

## 📁 Your Complete Folder Structure

```
gla-sports-portal/
│
├── index.html            ← Main portal (after login)
├── login.html            ← Login page (redesigned)
│
├── css/
│   └── style.css         ← White & green professional theme
│
├── js/
│   ├── login.js          ← Connects to your /login backend route
│   ├── data.js           ← All events, schedule, results data
│   └── app.js            ← All frontend logic + backend API calls
│
├── server.js             ← ✅ YOUR original backend (unchanged)
├── db.js                 ← ✅ YOUR original file (unchanged)
├── package.json          ← ✅ YOUR original file (unchanged)
├── users.json            ← ✅ YOUR original user data (unchanged)
│
└── models/
    ├── user.js           ← ✅ YOUR original Mongoose model (unchanged)
    └── Registration.js   ← ✅ YOUR original Mongoose model (unchanged)
```

---

## 🚀 How to Run

### Step 1 — Install dependencies
Open terminal in VS Code and run:
```
npm install
```

### Step 2 — Start MongoDB
Make sure MongoDB is running on your computer.
(Start MongoDB service or use MongoDB Compass)

### Step 3 — Start the backend server
```
node server.js
```
You should see:
```
Server running on port 5000
MongoDB Connected
```

### Step 4 — Open the website
Open `login.html` in your browser (or use Live Server in VS Code).

---

## 🔐 Login Credentials

Your existing users from `users.json`:
- Roll: **1001** → Password: **pass1001**
- Roll: **1002** → Password: **pass1002**
- (and so on up to 1100)

---

## 💡 What Was Changed vs What Stayed the Same

### ✅ NOT CHANGED (your original work):
- `server.js` — All your routes (/login, /register, /my-registrations)
- `models/user.js` — Your Mongoose User schema
- `models/Registration.js` — Your Mongoose Registration schema
- `package.json` — Your dependencies
- `users.json` — Your user data

### 🎨 REDESIGNED (frontend only):
- `login.html` — Professional split-screen white & green design
- `index.html` — Full portal with navbar, hero, pages
- `css/style.css` — Complete professional theme
- `js/app.js` — Still calls your same backend API routes
- `js/login.js` — Still calls your same /login route

---

## 🌐 API Routes (your backend — unchanged)

| Route | Method | Description |
|-------|--------|-------------|
| `/login` | POST | Login with roll + password |
| `/register` | POST | Register for an event |
| `/my-registrations/:user` | GET | Get registrations for a user |

---

*Mini Project — 3rd Year | GLA University, Mathura*
