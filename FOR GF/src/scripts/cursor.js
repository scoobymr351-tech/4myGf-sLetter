// create small heart trail on mouse move

(function () {
  // disable hearts on game pages
  const currentPage = window.location.pathname;
  if (currentPage.includes('yes-page.html') || currentPage.includes('game.html')) {
    return; // exit early, no hearts on these pages
  }

  const MAX_HEARTS = 25;
  let hearts = [];

  function createHeart(x, y) {
    const el = document.createElement('div');
    el.className = 'cursor-heart';
    el.textContent = '💕';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);
    hearts.push(el);

    el.addEventListener('animationend', () => {
      el.remove();
      hearts = hearts.filter(h => h !== el);
    });

    if (hearts.length > MAX_HEARTS) {
      const old = hearts.shift();
      if (old && old.parentNode) old.parentNode.removeChild(old);
    }
  }

  let enabled = true;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) enabled = false;

  if (enabled) {
    let last = 0;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - last < 80) return;
      last = now;
      createHeart(e.clientX, e.clientY);
    }, true); // use capture phase to ensure it works everywhere
  }
})();