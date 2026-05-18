document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    btn.style.transform = `
translate(
${(x - rect.width / 2) / 8}px,
${(y - rect.height / 2) / 8}px
)
`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});
