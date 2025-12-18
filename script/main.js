// Import the data to customize and insert them into page
let dataArr = [];

const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      dataArr = Object.keys(data);

      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData]);

          } else if (customData === "audioPath") {
            const audioEl = document.getElementById("bg-music");
            if (audioEl) {
              audioEl.src = data[customData];
            }

          } else {
            const el = document.querySelector(`[data-node-name*="${customData}"]`);
            if (el) el.innerText = data[customData];
          }
        }

        // Run animation after last JSON key
        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          animationTimeline();

          // Start countdown after data load
          if (data.weddingDate) {
            startCountdown(data.weddingDate);
          }
        }
      });
    });
};

// ⏳ Countdown Logic (Persistent till end)
const startCountdown = (weddingDateStr) => {
  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  const targetDate = new Date(weddingDateStr).getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownEl.innerText = "💍 Today is the big day!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.innerText =
      `Wedding in ${days} days ${hours}h ${minutes}m ${seconds}s`;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
};

// Animation Timeline
const animationTimeline = () => {

  // 🎵 Play background music safely
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic) {
    bgMusic.volume = 0.6;
    bgMusic.play().catch(() => {
      // autoplay blocked – will play on user interaction
    });
  }

  // Split chars for animation
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  const tl = new TimelineMax();

  tl
    .to(".container", 0.1, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=2.5")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=2")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 0.5, { visibility: "visible" }, 0.05)
    .to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" })
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=0.7")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-5", 0.7, {
      rotationX: 15,
      rotationZ: -10,
      skewY: "-5deg",
      y: 50,
      z: 10,
      opacity: 0
    }, "+=0.5")
    .to(".idea-5 .smiley", 0.7, { rotation: 90, x: 8 }, "+=0.4")
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
    .staggerFrom(".idea-6 span", 0.8, {
      scale: 3,
      opacity: 0,
      rotation: 15,
      ease: Expo.easeOut
    }, 0.2)
    .staggerTo(".idea-6 span", 0.8, {
      scale: 3,
      opacity: 0,
      rotation: -15,
      ease: Expo.easeOut
    }, 0.2, "+=1")
    .staggerFromTo(".baloons img", 2.5, {
      opacity: 0.9,
      y: 1400
    }, {
      opacity: 1,
      y: -1000
    }, 0.2)
    .from(".lydia-dp", 0.5, {
      scale: 3.5,
      opacity: 0,
      x: 25,
      y: -25,
      rotationZ: -45
    }, "-=2")
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0
    })
    .staggerFrom(".wish-hbd span", 0.7, {
      opacity: 0,
      y: -50,
      rotation: 150,
      skewX: "30deg",
      ease: Elastic.easeOut.config(1, 0.5)
    }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, {
      scale: 1.4,
      rotationY: 150
    }, {
      scale: 1,
      rotationY: 0,
      color: "#ff69b4",
      ease: Expo.easeOut
    }, 0.1, "party")
    .from(".wish h5", 0.5, {
      opacity: 0,
      y: 10,
      skewX: "-15deg"
    }, "party")
    .staggerTo(".eight svg", 1.5, {
      visibility: "visible",
      opacity: 0,
      scale: 80,
      repeat: 3,
      repeatDelay: 1.4
    }, 0.3)
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

  // Restart Animation + Music
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
    if (bgMusic) {
      bgMusic.currentTime = 0;
      bgMusic.play();
    }
  });
};

// Run fetch and animation in sequence
fetchData();
