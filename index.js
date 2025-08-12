document.addEventListener('mousemove', (e) => {
      // Create a new div element for the sparkle
      const sparkle = document.createElement('div');
      
      // Add the "sparkle" class to apply the CSS styles
      sparkle.classList.add('sparkle');
      
      // Position the sparkle at a slightly random offset from the cursor
      sparkle.style.left = `${e.pageX + (Math.random() - 0.5) * 30}px`;
      sparkle.style.top = `${e.pageY + (Math.random() - 0.5) * 30}px`;
      
      // Add the sparkle to the body of the document
      document.body.appendChild(sparkle);
      
      // Set a timer to remove the sparkle after its animation is complete (1 second)
      setTimeout(() => { sparkle.remove(); }, 1000);
    });

// Bubble shine on click/tap
document.addEventListener('click', (e) => {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  bubble.style.left = `${e.pageX - 10}px`;
  bubble.style.top = `${e.pageY - 10}px`;

  document.body.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 600);
});



// Animate text on scroll
const textElements = document.querySelectorAll('h1, .lead, p, .btn');

function revealText() {
  textElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}

window.addEventListener('scroll', revealText);
window.addEventListener('load', revealText);

const page = document.querySelector('.page');
const maxTilt = 5; // degrees

document.addEventListener('mousemove', (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = (e.clientX - centerX) / centerX;
  const deltaY = (e.clientY - centerY) / centerY;

  const rotateX = maxTilt * deltaY;
  const rotateY = maxTilt * deltaX;

  page.style.transform = `translateY(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
});

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.page');
  const reveals = page.querySelectorAll('.reveal, .left, .right, .hero, .flower');

  let delay = 0;
  const delayStep = 300; // ms between reveals

  function showNext(i = 0) {
    if (i >= reveals.length) return;
    reveals[i].classList.add('visible');
    setTimeout(() => showNext(i + 1), delayStep);
  }

  // Show page container first with 3D effect
  setTimeout(() => {
    page.classList.add('visible');
    showNext();
  }, 300);
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateZ(0) translateY(${scrollY * 0.3}px)`;
  }
});

window.addEventListener('DOMContentLoaded', () => {
  // Animate nav items sequentially
  const navItems = document.querySelectorAll('nav ul li');
  navItems.forEach((item, i) => {
    setTimeout(() => {
      item.classList.add('animate-visible');
    }, i * 150);  // 150ms stagger
  });

  // Animate hero container
  const heroContainer = document.querySelector('.container.hero');
  setTimeout(() => heroContainer.classList.add('animate-visible'), 1100);

  // Animate left and right side separately
  const leftSide = document.querySelector('.left');
  const rightSide = document.querySelector('.right');
  setTimeout(() => leftSide.classList.add('animate-visible'), 1400);
  setTimeout(() => rightSide.classList.add('animate-visible'), 1700);

  // Animate actions buttons
  const actions = document.querySelector('.actions');
  setTimeout(() => actions.classList.add('animate-visible'), 2100);

  // Animate micro-cards
  const microCards = document.querySelector('.micro-cards');
  setTimeout(() => microCards.classList.add('animate-visible'), 2400);

  // Animate footer last
  const footer = document.querySelector('footer');
  setTimeout(() => footer.classList.add('animate-visible'), 2700);
});

window.addEventListener('DOMContentLoaded', () => {
  // Reveal nav items one by one
  const navItems = document.querySelectorAll('nav ul li');
  navItems.forEach((item, i) => {
    setTimeout(() => {
      item.classList.add('visible');
    }, i * 150);
  });

  // Reveal hero left and right after nav
  const leftReveal = document.querySelector('.container.hero .left.reveal');
  const rightReveal = document.querySelector('.container.hero .right.reveal');

  setTimeout(() => leftReveal.classList.add('visible'), navItems.length * 150 + 300);
  setTimeout(() => rightReveal.classList.add('visible'), navItems.length * 150 + 600);
});

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.page');
  // keep same selector you were using to gather elements that animate on load:
  const reveals = page.querySelectorAll('.reveal, .left, .right, .hero, footer, nav ul li');
  const delayStep = 300; // ms between reveals (keeps your original rhythm)

  // Flower trail container (replace or use exact id you added in HTML)
  const flowerTrail = document.getElementById('flowerTrail');

  // Create a flower for each reveal item (cap to avoid huge columns).
  const flowerCount = Math.min(reveals.length, 12); // change cap if you want more
  for (let i = 0; i < flowerCount; i++) {
    const f = document.createElement('span');
    f.className = 'flower-node';
    f.textContent = '🌸';
    // Optional: set per-item CSS variable (if later you want hue-variation)
    f.style.setProperty('--idx', i);
    flowerTrail.appendChild(f);
  }

  // Show elements and bloom corresponding flower in sync
  function showNext(i = 0) {
    if (i >= reveals.length) return;

    // reveal the page element
    reveals[i].classList.add('visible');

    // map a flower to this reveal index (if available)
    // mapping is one-to-one top-down: reveal[0] -> flower[0], etc.
    const flower = flowerTrail.children[i];
    if (flower) {
      // a tiny extra offset so the element's reveal and flower bloom feel harmonious
      setTimeout(() => {
        flower.classList.add('blooming');
        // remove bloom after a while so it can re-trigger if needed later
        setTimeout(() => flower.classList.remove('blooming'), 2200);
      }, 60);
    }

    // schedule next reveal
    setTimeout(() => showNext(i + 1), delayStep);
  }

  // kick off entrance: show page container then sequential reveals
  setTimeout(() => {
    page.classList.add('visible');
    showNext();
  }, 300);
});

window.addEventListener('load', () => {
  // Wait 1 second after page load to start reveal sequence
  setTimeout(() => {
    const trail = document.querySelector('.flower-trail');
    if (!trail) return;

    // Make container visible
    trail.classList.add('show');

    const flowers = Array.from(trail.querySelectorAll('span'));
    const gapMs = 500;       // time between each flower reveal (ms)
    const fadeDurMs = 550;   // should match fadeInFlower duration in CSS

    flowers.forEach((flower, i) => {
      const delay = i * gapMs;
      setTimeout(() => {
        // trigger the one-time fade-in
        flower.classList.add('fade-in');

        // after the fade animation finishes, start the continuous bloom pulse
        setTimeout(() => {
          flower.classList.add('blooming');
        }, fadeDurMs);
      }, delay);
    });

  }, 1000); // 1 second initial delay
});
