window.addEventListener("scroll", () => {
  const y = window.scrollY;

  document.querySelectorAll(".layer").forEach((el, i) => {
    el.style.opacity = 1 - y * 0.0003;
  });
});
