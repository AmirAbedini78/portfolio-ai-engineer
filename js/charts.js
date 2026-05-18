const values = [92, 84, 97, 88];

document.querySelectorAll(".kpi span").forEach((el, i) => {
  let v = 0;

  const target = values[i];

  const t = setInterval(() => {
    v++;

    el.innerText = v + "%";

    if (v >= target) {
      clearInterval(t);
    }
  }, 20);
});
