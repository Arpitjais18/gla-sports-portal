// ═══════════════════════════════════════════════════
//  app.js — Frontend logic for GLA SportsFest 2026
//  Connects to your existing Node.js + MongoDB backend
//  Backend API base: http://localhost:5000
// ═══════════════════════════════════════════════════

const API = ""; // ✅ empty string = relative URL = same port 5000

// ── Get logged-in user from localStorage (set by login.js) ──
const currentUser = localStorage.getItem("user") || "";
document.getElementById("navRoll").textContent = "Roll: " + currentUser;

// ── Logout ──
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// ══════════════════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════════════════
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page-" + id).classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => {
    if (b.getAttribute("onclick") && b.getAttribute("onclick").includes("'" + id + "'"))
      b.classList.add("active");
  });

  const renders = {
    home:     () => { renderHomeEvents(); renderAnnouncements(); },
    events:   () => renderAllEvents(),
    myEvents: () => loadMyRegistrations(),
    schedule: () => renderSchedule(),
    results:  () => renderResults(),
    about:    () => renderAbout()
  };
  if (renders[id]) renders[id]();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ══════════════════════════════════════════════════════
//  EVENT CARD BUILDER
// ══════════════════════════════════════════════════════
function buildCard(ev) {
  return `
    <div class="ev-card" onclick="openRegModal(${ev.id})">
      <div class="ec-top">
        <span>${ev.emoji}</span>
        <span class="ec-badge badge-${ev.status}">${ev.status}</span>
      </div>
      <div class="ec-body">
        <div class="ec-name">${ev.name}</div>
        <div class="ec-meta">
          <span>📅 <b>${ev.date}</b></span>
          <span>⏰ <b>${ev.time}</b></span>
          <span>📍 <b>${ev.venue}</b></span>
          <span>👤 <b>${ev.coordinator}</b></span>
        </div>
        <div class="ec-tags">
          <span class="tag tag-${ev.category}">${ev.category}</span>
          <span class="tag tag-${ev.type}">${ev.type}</span>
        </div>
        ${ev.status === "completed"
          ? '<span class="ec-badge badge-completed" style="position:static;display:inline-block;margin-top:0.3rem;">Closed</span>'
          : '<button class="btn btn-primary btn-sm" style="margin-top:0.4rem;width:100%;">Register</button>'
        }
      </div>
    </div>`;
}

function renderHomeEvents() {
  const upcoming = eventsData.filter(e => e.status !== "completed").slice(0, 3);
  document.getElementById("home-events").innerHTML =
    upcoming.map(buildCard).join("") || '<p style="color:var(--text-muted);padding:1rem;">No upcoming events.</p>';
}

function renderAllEvents(filter) {
  filter = filter || "all";
  let list = eventsData;
  if (filter !== "all") {
    if (["outdoor","indoor"].includes(filter))     list = eventsData.filter(e => e.category === filter);
    else if (["team","individual"].includes(filter)) list = eventsData.filter(e => e.type === filter);
    else                                              list = eventsData.filter(e => e.status === filter);
  }
  document.getElementById("all-events").innerHTML =
    list.map(buildCard).join("") || '<p style="color:var(--text-muted);padding:2rem;">No events match this filter.</p>';
}

function filterEv(f, btn) {
  document.querySelectorAll(".filter-bar .chip").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderAllEvents(f);
}

// ══════════════════════════════════════════════════════
//  REGISTRATION MODAL
// ══════════════════════════════════════════════════════
function openRegModal(id) {
  const ev = eventsData.find(e => e.id === id);
  if (!ev) return;

  document.getElementById("reg-modal-content").innerHTML = `
    <div class="modal-head">
      <button class="modal-close" onclick="closeRegModal()">×</button>
      <div class="modal-emoji">${ev.emoji}</div>
      <h2>${ev.name}</h2>
      <p>${ev.description}</p>
    </div>
    <div class="modal-body">
      <div class="info-grid">
        <div class="info-box"><label>Date</label><span>${ev.date}</span></div>
        <div class="info-box"><label>Time</label><span>${ev.time}</span></div>
        <div class="info-box"><label>Venue</label><span>${ev.venue}</span></div>
        <div class="info-box"><label>Type</label><span style="text-transform:capitalize;">${ev.type}</span></div>
      </div>
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--green);margin-bottom:0.5rem;">Rules</div>
      <ul class="rules-box">${ev.rules.map(r => `<li>${r}</li>`).join("")}</ul>

      ${ev.status === "completed"
        ? `<div style="background:var(--off-white);border:1.5px solid var(--border);border-radius:var(--radius);padding:1rem;text-align:center;color:var(--text-muted);">This event is closed for registration.</div>`
        : `<div class="reg-success-strip" id="modal-success">✅ Registered successfully! Good luck!</div>
           <div class="reg-error-strip"   id="modal-error"></div>
           <button class="btn btn-primary" style="width:100%;" onclick="submitRegistration('${ev.name}')">
             Register for ${ev.name}
           </button>
           <p style="text-align:center;color:var(--text-muted);font-size:0.75rem;margin-top:0.7rem;">
             Registering as Roll No: <b style="color:var(--green);">${currentUser}</b>
           </p>`
      }
    </div>`;

  document.getElementById("reg-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeRegModal(e) {
  if (!e || e.target === document.getElementById("reg-modal")) {
    document.getElementById("reg-modal").classList.remove("open");
    document.body.style.overflow = "";
  }
}

// ── Submit registration to your Node.js backend ──
async function submitRegistration(eventName) {
  const successEl = document.getElementById("modal-success");
  const errorEl   = document.getElementById("modal-error");
  successEl.style.display = "none";
  errorEl.style.display   = "none";

  try {
    const res  = await fetch(API + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: currentUser, event: eventName })
    });
    const data = await res.json();

    if (data.success) {
      successEl.style.display = "block";
    } else {
      errorEl.textContent     = "❌ " + (data.message || "Registration failed. Try again.");
      errorEl.style.display   = "block";
    }
  } catch (err) {
    // Fallback for when backend is not running (demo mode)
    console.warn("Backend not reachable — demo mode active.");
    successEl.textContent   = "✅ Registered! (Demo mode — backend not connected)";
    successEl.style.display = "block";
  }
}

// ── Load my registrations from your backend ──
async function loadMyRegistrations() {
  const wrap = document.getElementById("my-reg-wrap");
  wrap.innerHTML = '<div class="loading-state">Loading your registrations...</div>';

  try {
    const res  = await fetch(API + "/my-registrations/" + currentUser);
    const data = await res.json();

    if (!data.length) {
      wrap.innerHTML = '<div class="empty-state">You have not registered for any events yet.<br/><br/><button class="btn btn-primary" onclick="showPage(\'events\')">Browse Events</button></div>';
      return;
    }

    wrap.innerHTML = `
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>#</th><th>Event</th><th>Registered On</th></tr></thead>
          <tbody>
            ${data.map((r, i) => `
              <tr>
                <td>${i + 1}</td>
                <td><strong>${r.event}</strong></td>
                <td>${r.time}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`;
  } catch (err) {
    wrap.innerHTML = `
      <div class="empty-state">
        ⚠️ Could not connect to backend server.<br/>
        <small style="color:var(--text-muted);">Make sure your Node.js server is running on port 5000.<br/>
        Run: <code>node server.js</code> in your project folder.</small>
      </div>`;
  }
}

// ══════════════════════════════════════════════════════
//  SCHEDULE
// ══════════════════════════════════════════════════════
function renderSchedule() {
  let html = "";
  for (const [day, items] of Object.entries(scheduleData)) {
    html += `<div class="sched-day"><div class="day-label">📅 ${day}</div>`;
    items.forEach(item => {
      html += `<div class="sched-row">
        <div class="sched-time">${item.time}</div>
        <div><div class="sched-name">${item.name}</div><div class="sched-venue">📍 ${item.venue}</div></div>
        <span class="ec-badge badge-${item.status}">${item.status}</span>
      </div>`;
    });
    html += "</div>";
  }
  document.getElementById("sched-content").innerHTML = html;
}

// ══════════════════════════════════════════════════════
//  RESULTS
// ══════════════════════════════════════════════════════
function renderResults() {
  const completed = eventsData.filter(e => e.status === "completed");
  if (!completed.length) {
    document.getElementById("results-content").innerHTML =
      '<div class="empty-state">No results yet. Check back after events conclude.</div>';
    return;
  }
  let html = "";
  completed.forEach(ev => {
    const rd = resultsData.find(r => r.name === ev.name);
    html += `<div class="result-card"><h3>${ev.emoji} ${ev.name}</h3>`;
    if (rd) {
      html += rd.results.map(r =>
        `<div class="podium-row"><span class="medal">${r.pos}</span><span class="p-name">${r.name}</span><span class="p-score">${r.score}</span></div>`
      ).join("");
    } else {
      html += '<p style="color:var(--text-muted);font-size:0.88rem;">Results being updated...</p>';
    }
    html += "</div>";
  });
  document.getElementById("results-content").innerHTML = html;
}

// ══════════════════════════════════════════════════════
//  ANNOUNCEMENTS
// ══════════════════════════════════════════════════════
function renderAnnouncements() {
  document.getElementById("home-announcements").innerHTML =
    announcements.map(a => `
      <div class="ann-item">
        <h4>${a.title}</h4>
        <p>${a.text}</p>
        <div class="ann-date">${a.date}</div>
      </div>`).join("");
}

// ══════════════════════════════════════════════════════
//  ABOUT
// ══════════════════════════════════════════════════════
function renderAbout() {
  document.getElementById("team-grid").innerHTML =
    teamMembers.map(m => `
      <div class="team-card">
        <div class="team-avatar">${m.emoji}</div>
        <div class="team-name">${m.name}</div>
        <div class="team-role">${m.role}</div>
      </div>`).join("");
}

// ══════════════════════════════════════════════════════
//  KEYBOARD — close modal on Escape
// ══════════════════════════════════════════════════════
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeRegModal({ target: document.getElementById("reg-modal") });
});

// ══════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════
renderHomeEvents();
renderAnnouncements();
