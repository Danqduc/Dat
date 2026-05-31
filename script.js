const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const intro = document.querySelector(".video-intro");
const introVideo = document.querySelector(".intro-video");
const introStart = document.querySelector(".intro-start");

function finishIntro() {
  if (!intro) {
    return;
  }

  intro.classList.add("is-finished");
  document.body.classList.remove("intro-active");
}

if (intro && introVideo && introStart) {
  introStart.addEventListener("click", () => {
    intro.classList.add("is-playing");
    introVideo.currentTime = 0;

    const playIntro = introVideo.play();

    if (playIntro) {
      playIntro.catch(finishIntro);
    }
  });

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
