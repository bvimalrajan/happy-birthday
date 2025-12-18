// Load customize.json
fetch("customize.json")
  .then(res => res.json())
  .then(data => {
    document.querySelectorAll("[data-node-name]").forEach(el => {
      const key = el.dataset.nodeName;
      if (!data[key]) return;

      if (el.tagName === "IMG" || el.tagName === "AUDIO") {
        el.src = data[key];
      } else {
        el.innerHTML = data[key];
      }
    });
  });

// Countdown
const target = new Date("March 16, 2026 00:00:00").getTime();
setInterval(() => {
  const now = Date.now();
  const diff = target - now;
  if (diff < 0) return;

  document.getElementById("cd-days").innerText = Math.floor(diff / 86400000);
  document.getElementById("cd-hours").innerText = Math.floor(diff / 3600000) % 24;
  document.getElementById("cd-mins").innerText = Math.floor(diff / 60000) % 60;
  document.getElementById("cd-secs").innerText = Math.floor(diff / 1000) % 60;
}, 1000);

// GSAP Timeline
window.onload = () => {
  const tl = new TimelineMax();

  tl.to(".one", 1, { opacity: 1 })
    .to(".one", 1, { opacity: 0, delay: 2 })

    .to(".three", 1, { opacity: 1 })
    .to(".three", 1, { opacity: 0, delay: 2 })

    .to(".four", 1, { opacity: 1 })
    .to(".four", 1, { opacity: 0, delay: 2 })

    .to(".five", 1, { opacity: 1 })
    .to(".five", 1, { opacity: 0, delay: 3 })

    .to(".six", 1, { opacity: 1 })
    .to(".nine", 1, { opacity: 1, delay: 2 });
};
