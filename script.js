// Theme toggle with persistence and prefers-color-scheme fallback

(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  // initialize theme: check localStorage -> data-theme attribute -> prefers-color-scheme
  function initTheme() {
    const stored = localStorage.getItem('theme'); // 'dark' | 'light' | null
    if (stored === 'dark' || stored === 'light') {
      applyTheme(stored);
    } else {
      // use system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) applyTheme('dark');
      else applyTheme('light');
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      toggle.textContent = '☀️';
      toggle.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      toggle.textContent = '🌙';
      toggle.setAttribute('aria-pressed', 'false');
    }
    localStorage.setItem('theme', theme);
  }

  toggle.addEventListener('click', () => {
    const current = localStorage.getItem('theme') === 'dark' || root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // optional: listen to system changes and update only if user hasn't explicitly set theme
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const stored = localStorage.getItem('theme');
    if (!stored) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  initTheme();

  // Button micro-interactions: simple click ripple for primary buttons
  document.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList && el.classList.contains('primary-animated')) {
      // small scale pulsing on click
      el.animate([
        { transform: 'translateY(-6px) scale(1.01)' },
        { transform: 'translateY(-2px) scale(.995)' },
        { transform: 'translateY(-6px) scale(1.01)' }
      ], {
        duration: 220,
        easing: 'ease-out'
      });
    }
  });

  console.log("Portfolio (with dark mode + animated buttons) loaded.");
})();
