// Smooth, serial reveal for lab cards
window.addEventListener('load', () => {
  // slight initial delay so page settles visually
  const startDelay = 500;    // ms before first card appears (tweak if needed)
  const stagger = 420;       // ms between each card reveal (increase to slow further)
  const cards = Array.from(document.querySelectorAll('.learning-labs .lab-card.reveal'));

  // If no cards found, nothing to do
  if (!cards.length) return;

  // Reveal container first for a clean stage (optional)
  const container = document.querySelector('.learning-labs');
  if (container) container.classList.add('reveal-shown');

  cards.forEach((card, i) => {
    const delay = startDelay + i * stagger;
    setTimeout(() => {
      card.classList.add('visible');   // uses .reveal.visible CSS to animate in
      // slight extra polish: add a tiny 3D tilt on arrival then settle
      card.style.willChange = 'transform, opacity';
      card.style.transitionTimingFunction = 'cubic-bezier(.2,.9,.2,1)';
    }, delay);
  });
});
