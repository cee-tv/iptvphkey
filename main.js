const directLinks = [
  { url: "https://www.profitableratecpm.com/ruanfw02gs?key=bf4fca7f3029881a89da417781fe3ddb", label: "Direct Link 1" },
  { url: "https://www.profitableratecpm.com/z3xzct3zrf?key=4fccd0cd87c1c6cfea3a5a777d6a0242", label: "Direct Link 2" },
  { url: "https://www.profitableratecpm.com/u63pxyqi7p?key=7fcb2dc4112c48fbfccf4bac095c138f", label: "Direct Link 3" }
];

let linkStep = 0;
let countdown = 5;
let countdownInterval = null;

function renderLinks() {
  const directLinksDiv = document.getElementById('direct-links');
  directLinksDiv.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    let btn;
    if (i > linkStep) {
      btn = `<button class="btn btn-secondary btn-link-step" disabled style="opacity:0.6;">
              <i class="bi bi-link-45deg"></i> ${directLinks[i].label}
            </button>`;
    } else if (i < linkStep) {
      btn = `<button class="btn btn-success btn-link-step" disabled>
              <i class="bi bi-check2-circle"></i> ${directLinks[i].label} <span class="countdown-badge">✓</span>
            </button>`;
    } else {
      btn = `<button id="step-btn" class="btn btn-primary btn-link-step" disabled>
              <i class="bi bi-link-45deg"></i> ${directLinks[i].label}
              <span id="countdown" class="countdown-badge">(${countdown})</span>
            </button>`;
    }
    directLinksDiv.innerHTML += btn + "<br/>";
  }
}

function startCountdown() {
  renderLinks();
  countdownInterval = setInterval(() => {
    countdown -= 1;
    const countdownSpan = document.getElementById('countdown');
    if (countdownSpan) countdownSpan.textContent = `(${countdown})`;
    if (countdown <= 0) {
      clearInterval(countdownInterval);
      enableCurrentLink();
    }
  }, 1000);
}

function enableCurrentLink() {
  const stepBtn = document.getElementById('step-btn');
  if (stepBtn) {
    stepBtn.disabled = false;
    const countdownSpan = document.getElementById('countdown');
    if (countdownSpan) countdownSpan.textContent = "(Go)";
    stepBtn.addEventListener('click', handleLinkClick, { once: true });
  }
}

function handleLinkClick() {
  // Open the link in a new tab
  window.open(directLinks[linkStep].url, "_blank");
  linkStep += 1;
  countdown = 5;
  if (linkStep < directLinks.length) {
    startCountdown();
  } else {
    // All links clicked, show the key
    document.getElementById('direct-links').innerHTML = `<div class="alert alert-success mb-3"><i class="bi bi-check-circle"></i> All links visited. Key will appear below.</div>`;
    loadKey();
  }
}

async function loadKey() {
  const keyArea = document.getElementById('key-area');
  keyArea.innerHTML = `
    <div class="d-flex flex-column align-items-center">
      <div class="spinner-border text-primary mb-2" role="status" id="spinner">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span class="text-secondary">Fetching key&hellip;</span>
    </div>
  `;

  // Get today's date in UTC
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(now.getUTCDate()).padStart(2, '0');
  const fileName = `${yyyy}-${mm}-${dd}.txt`;

  // Correct repository and branch ("main")
  const url = `https://raw.githubusercontent.com/Warren122093/iptvphkey/main/keys/${fileName}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Key not found yet.');
    const key = await response.text();
    keyArea.innerHTML = `
      <div class="alert alert-success d-flex align-items-center justify-content-center" role="alert" style="width:100%;">
        <i class="bi bi-shield-lock me-2"></i>
        <div class="key-value" style="white-space: pre-wrap; margin-bottom: 0;">${key.trim()}</div>
        <button class="btn btn-outline-primary btn-sm ms-3" id="copy-key-btn"><i class="bi bi-clipboard"></i> Copy</button>
      </div>
    `;
    document.getElementById('copy-key-btn').onclick = function() {
      navigator.clipboard.writeText(key.trim());
      this.innerHTML = '<i class="bi bi-clipboard-check"></i> Copied!';
      this.disabled = true;
      setTimeout(() => {
        this.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
        this.disabled = false;
      }, 1200);
    };
  } catch (e) {
    keyArea.innerHTML = `
      <div class="alert alert-warning d-flex align-items-center justify-content-center" role="alert">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        <span>Key not available yet.</span>
      </div>
    `;
  }
}

window.onload = () => {
  renderLinks();
  startCountdown();
  document.getElementById('key-area').innerHTML = '';
};
