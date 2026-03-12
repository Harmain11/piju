// NAVBAR WALLET
const button = document.querySelector("button");

let scale = 1;
let growing = true;

function smoothPulse() {

  const speed = 0.003;
  const maxScale = 1.12;
  const minScale = 1;

  if (growing) {
    scale += speed;
    if (scale >= maxScale) growing = false;
  } else {
    scale -= speed;
    if (scale <= minScale) growing = true;
  }

  button.style.transform = `scale(${scale})`;

  requestAnimationFrame(smoothPulse);
}

smoothPulse();

// CONTENT 1.
// FLOATING IMAGE
document.addEventListener('DOMContentLoaded', () => {
  const windWrapper = document.querySelector('.wind-wrapper');

  setTimeout(() => {
    windWrapper.classList.remove('opacity-0', 'translate-y-8');
    windWrapper.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-700', 'ease-out');
  }, 200);
});

// COUNTDOWN SECTION
const boxes = document.querySelectorAll('.countdown-box');

boxes.forEach((box, index) => {
  setTimeout(() => {
    box.classList.add('show');
  }, index * 300);
});

// PIJU TEXT
window.addEventListener('DOMContentLoaded', () => {
  const text = document.getElementById('piju-text');
  setTimeout(() => {
    text.classList.remove('translate-y-6', 'opacity-0');
  }, 300);
});

// SET DATE
// Launch: 15 Maret 2026 00:00 Vancouver (Pacific Time)
const launchDate = Date.parse("2026-03-30T07:00:00Z");

function getCanadaNow() {
  return new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Vancouver",
    })
  ).getTime();
}

function updateCountdown() {
  const now = getCanadaNow(); // TIME VANCOUVER
  const distance = launchDate - now;

  if (distance <= 0) {
    clearInterval(countdownInterval);
    document.querySelector(".mt-12 p").innerText = "🎉 Launch is live! 🎉";
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();


// AUTOPLAY AUDIO
document.addEventListener("DOMContentLoaded", () => {

  const music = document.getElementById("bgMusic");
  music.volume = 0.3;

  let started = false;

  async function startMusic() {
    if (started) return;

    try {
      await music.play();
      started = true;
      console.log("🎵 Music started");

      document.removeEventListener("click", startMusic);
      document.removeEventListener("pointerdown", startMusic);
      document.removeEventListener("touchstart", startMusic);

    } catch (e) {
      console.log("❌ Autoplay blocked");
    }
  }

  // EVENT VALID
  document.addEventListener("click", startMusic);
  document.addEventListener("pointerdown", startMusic);
  document.addEventListener("touchstart", startMusic);

});

// CONTENT 2.
// BUY PIJU ON
// TITLE AVAILABLE ON
document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".meet-piju-scan");

  element.style.transform = "translateY(-50px)";
  element.style.opacity = "0";

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        element.style.transition = "transform 1s ease-out, opacity 1s ease-out";
        element.style.transform = "translateY(0)";
        element.style.opacity = "1";

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(element);
});

// TEXT YOUR GATEWAY TO TRADING $PIJU
document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".appear-from-bottom");

  element.style.transform = "translateY(50px)";
  element.style.opacity = "0";

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.style.transition = "transform 1s ease-out, opacity 1s ease-out";
          element.style.transform = "translateY(0)";
          element.style.opacity = "1";
        }, 300);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(element);
});

// GRID
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".logo-grid");
  const cards = document.querySelectorAll(".logo-card");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.transform = "translateY(0)";
            card.style.opacity = "1";
          }, index * 250);
        });

        cards.forEach(card => observer.unobserve(card));
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
});

// CONTENT 3.
// TITLE MEET PIJU
document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".appear-from-top");

  element.style.transform = "translateY(-50px)";
  element.style.opacity = "0";

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        element.style.transition = "transform 1s ease-out, opacity 1s ease-out";
        element.style.transform = "translateY(0)";
        element.style.opacity = "1";

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(element);
});

// TITLE PARAGRAF 
// While DARKPINO emerged from the shadows with vengeance, PIJU represents<br> something different — the innocent beginning, the playful spirit, and the < br > promise of growth.
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".appear-from-bottom");

  elements.forEach(element => {

    element.style.transform = "translateY(50px)";
    element.style.opacity = "0";

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          element.style.transition = "transform 1s ease-out, opacity 1s ease-out";
          element.style.transform = "translateY(0)";
          element.style.opacity = "1";

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(element);
  });
});

// CARD
const cards = document.querySelectorAll('.merch-card');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 300);

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

// TEXT FROM THE PINO & DARK PINO TEAM
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".appear-from-left");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        elements.forEach((el, index) => {
          setTimeout(() => {
            el.style.transform = "translateX(0)";
            el.style.opacity = "1";
          }, index * 150);
        });

        elements.forEach(el => observer.unobserve(el));
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
});

// CONTENT 4.
// PURE UNADULTERATED CHAOS
// TEXT UNADULTERATED CHAOS
document.addEventListener("DOMContentLoaded", () => {
  const h2 = document.getElementById("chaos-title");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        h2.style.opacity = "1";
        h2.style.transform = "translateY(0)";

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(h2);
});

// CARD
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".appear-from-right");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        card.style.transform = "translateX(0)";
        card.style.opacity = "1";

        observer.unobserve(card);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(card);
});

// CARD BOTTOM STATS
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".appear-card");

  // beri index untuk delay
  cards.forEach((card, i) => card.setAttribute("data-index", i));

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});

// CONTENT 5.
// TEXT TOKENOMICS
document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('tokenomics-title');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';

        observer.unobserve(title);
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(title);
});

// CARD
document.addEventListener('DOMContentLoaded', () => {

  const glowCards = document.querySelectorAll('.glow-card');

  glowCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {

        setTimeout(() => {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }, index * 300);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  glowCards.forEach(card => observer.observe(card));
});

// LP LOCKED
document.addEventListener('DOMContentLoaded', () => {

  const glowStatic = document.querySelector('.glow-static');

  glowStatic.style.opacity = 0;
  glowStatic.style.transform = 'translateY(30px)';
  glowStatic.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(glowStatic);
});

// CONTENT 6.
// LEFT STACKED CARDS 1, 2, 3
document.addEventListener('DOMContentLoaded', () => {

  const appearItems = document.querySelectorAll('.appear-item');
  if (!appearItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const index = [...appearItems].indexOf(el);

        setTimeout(() => {
          el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          el.style.opacity = 1;
          el.style.transform = 'translateY(0)';
        }, index * 300);

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.3
  });

  appearItems.forEach(el => observer.observe(el));

});

// JOIN THE TRIBE & SUBTEXT
document.addEventListener('DOMContentLoaded', () => {

  const items = document.querySelectorAll('.appear-title, .appear-subtext');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  items.forEach(el => observer.observe(el));

});

// SOCIAL ICONS
document.addEventListener('DOMContentLoaded', () => {

  const items = document.querySelectorAll('.appear-social');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 150);
        });

        observer.disconnect();
      }
    });
  }, {
    threshold: 0.2
  });

  observer.observe(items[0]);

});
