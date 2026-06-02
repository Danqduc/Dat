const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const intro = document.querySelector(".video-intro");
const introVideo = document.querySelector(".intro-video");
let introFinished = false;

function finishIntro() {
  if (!intro || introFinished) {
    return;
  }

  introFinished = true;

  if (introVideo) {
    introVideo.pause();
  }

  intro.classList.add("is-finished");
  intro.setAttribute("aria-hidden", "true");
  document.body.classList.remove("intro-active");

  window.setTimeout(() => {
    intro.style.display = "none";
  }, 720);
}

function skipIntro(event) {
  if (!document.body.classList.contains("intro-active")) {
    return;
  }

  if (event.cancelable) {
    event.preventDefault();
  }

  finishIntro();
}

if (intro && introVideo) {
  document.addEventListener("pointerdown", skipIntro, { capture: true });
  document.addEventListener("mousedown", skipIntro, { capture: true });
  document.addEventListener("touchstart", skipIntro, { capture: true, passive: false });
  document.addEventListener("click", skipIntro, { capture: true });
  introVideo.muted = true;
  introVideo.currentTime = 0;

  const playIntro = introVideo.play();

  if (playIntro) {
    playIntro.catch(finishIntro);
  }

  introVideo.addEventListener("ended", finishIntro);
  introVideo.addEventListener("error", finishIntro);
} else {
  document.body.classList.remove("intro-active");
}

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});
