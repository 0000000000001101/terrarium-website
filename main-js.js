// ===== TERRARIUM SITE SCRIPT =====

// 1. Day / Night toggle (remembers your choice)
const toggleBtn = document.getElementById('theme-toggle');

function applyTheme(night) {
  document.body.classList.toggle('night', night);
  toggleBtn.textContent = night ? '☀️ Day mode' : '🌙 Night mode';
}

let savedNight = false;
try { savedNight = localStorage.getItem('terrarium-night') === '1'; } catch (e) {}
applyTheme(savedNight);

toggleBtn.addEventListener('click', () => {
  const night = !document.body.classList.contains('night');
  applyTheme(night);
  try { localStorage.setItem('terrarium-night', night ? '1' : '0'); } catch (e) {}
});

// 2. Scroll-reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// 3. Floating fireflies / spores in the background
function spawnFireflies(count) {
  for (let i = 0; i < count; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';
    f.style.left = Math.random() * 100 + 'vw';
    f.style.top = (40 + Math.random() * 55) + 'vh';
    f.style.animationDuration = (6 + Math.random() * 8) + 's';
    f.style.animationDelay = (Math.random() * 8) + 's';
    document.body.appendChild(f);
  }
}
spawnFireflies(18);

// 4. Download buttons (placeholder until the real files exist)
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

document.getElementById('dl-linux').addEventListener('click', () => {
  // showToast('Linux build coming soon! 🐧');
  Later: window.location.href = 'https://github.com/0000000000001101/terrarium/releases/download/v0.1.0/Terrarium-Linux.x86_64';
});

document.getElementById('dl-windows').addEventListener('click', () => {
  // showToast('Windows build coming soon! 🪟');
  Later: window.location.href = 'https://github.com/0000000000001101/terrarium/releases/download/v0.1.0/Terrarium-Windows.exe';
});
