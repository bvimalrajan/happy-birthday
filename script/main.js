const fetchData = () => {
  fetch("customize.json")
    .then(res => res.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        if (data[key] !== "") {
          if (key === "imagePath") {
            document.querySelector(`[data-node-name*="${key}"]`).src = data[key];
          } else {
            const el = document.querySelector(`[data-node-name*="${key}"]`);
            if (el) el.innerText = data[key];
          }
        }
      });
      animationTimeline();
    });
};

const animationTimeline = () => {
  const tl = new TimelineMax();

  tl.to(".container", 0.1, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=2")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .from(".four", 0.7, { opacity: 0 })
    .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0 }, 0.2)
    .from(".wish-hbd", 1, { opacity: 0, y: 20 })
    .from(".nine p", 1, { opacity: 0, y: 20 });

  document.getElementById("replay").onclick = () => tl.restart();
};

fetchData();
