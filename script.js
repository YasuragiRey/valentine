const title      = document.getElementById("title");
const button     = document.getElementById("runaway-btn");
const teaser     = document.getElementById("teaser");
const giveupBtn  = document.getElementById("giveup-btn");
const successMsg = document.getElementById("success-message");

let attemptCount = 0;
const MAX_ATTEMPTS = 15;

const messages = [
  "ehe try again~ ♡",
  "too slowww (˶˘ ▿ ˘˶)",
  "almost... psyke! ฅ^•ﻌ•^ฅ",
  "hehe nope nope~ ✧",
  "catch me if you cannn~ ♡",
  "aww you're so closeee (´｡• ◡ •｡`)",
  "shy button go brrr ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა",
  "you really want me huh? (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
  "keep trying... maybe~ ♡",
  "missed againnnn (˃̣̣̥᷄⌓˂̣̣̥᷅ )",
  "I'm too slippery~ ฅ(๑˙o˙๑)ฅ",
  "one more try pls? ヾ( ˃ᴗ˂ )◞ • *✰",
  "you'll never catch me~ ( •̀ ω •́ )✧",
  "skill issue? hehe~ (˵ •̀ ᴗ - ˵ ) ✧"
];

let msgIndex = 0;

function showTeaser() {
  teaser.textContent = messages[msgIndex];
  teaser.classList.add("visible");
  msgIndex = (msgIndex + 1) % messages.length;
  setTimeout(() => teaser.classList.remove("visible"), 1700);
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function moveButton() {
  const padding = 80;
  const maxTop  = window.innerHeight - button.offsetHeight - padding * 2;
  const maxLeft = window.innerWidth  - button.offsetWidth  - padding * 2;

  const newTop  = Math.max(padding, getRandomNumber(maxTop));
  const newLeft = Math.max(padding, getRandomNumber(maxLeft));

  anime({
    targets: button,
    top: newTop,
    left: newLeft,
    duration: 900,
    easing: 'easeOutCirc'
  });
}

function createFloatingHearts(count = 12) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = ["💗", "💕", "♡", "💖", "✧", "♥"][Math.floor(Math.random() * 6)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top  = "100vh";
    heart.style.animationDelay = Math.random() * 2 + "s";
    heart.style.fontSize = (0.9 + Math.random() * 1.2) + "rem";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
  }
}

function triggerGiveUp() {
  title.classList.add("faded");
  button.style.display    = "none";
  giveupBtn.style.display = "none";
  teaser.style.display    = "none";

  successMsg.style.display = "block";
  setTimeout(() => {
    successMsg.classList.add("visible");
  }, 300);

  createFloatingHearts(20);
  setTimeout(() => createFloatingHearts(15), 1500);
  setTimeout(() => createFloatingHearts(12), 2800);
}

// Attach events
["mouseover", "mouseenter", "click", "touchstart", "pointerdown"].forEach(evt => {
  button.addEventListener(evt, (e) => {
    e.preventDefault();
    moveButton();
    showTeaser();

    attemptCount++;
    if (attemptCount >= MAX_ATTEMPTS) {
      giveupBtn.style.display = "block";
    }
  });
});

giveupBtn.addEventListener("click", triggerGiveUp);

// Let anime.js control initial position
setTimeout(() => {
  button.style.top  = "";
  button.style.left = "";
}, 100);