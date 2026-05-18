const items = document.querySelectorAll(".layer");

let angle = 0;

function animateGraph() {
  angle += 0.01;

  items.forEach((el, i) => {
    const y = Math.sin(angle + i) * 8;

    el.style.transform = `
translateY(
${y}px
)
`;
  });

  requestAnimationFrame(animateGraph);
}

animateGraph();
