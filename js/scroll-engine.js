window.addEventListener("scroll", () => {
  const y = window.scrollY;

  document.body.style.backgroundPosition = `
    0 ${y * 0.1}px
    `;

  const hero = document.querySelector("#hero");

  hero.style.transform = `
    translateY(
    ${y * 0.15}px
    )
    `;
});
