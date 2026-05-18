const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section").forEach((s) => {
  s.classList.add("reveal");

  observer.observe(s);
});
