const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

window.addEventListener("load", () => {
  window.setTimeout(() => {
    $("#loader")?.classList.add("hidden");
  }, 1450);
});

const cursor = $("#cursor");
if (cursor && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  $$("a, button, .timeline__item, .arch-node").forEach((item) => {
    item.addEventListener("pointerenter", () => cursor.classList.add("is-active"));
    item.addEventListener("pointerleave", () => cursor.classList.remove("is-active"));
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

$$(".reveal").forEach((item) => revealObserver.observe(item));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString("fa-IR");
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.45 }
);

$$("[data-count]").forEach((item) => countObserver.observe(item));

$$(".accordion__head").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".accordion__item");
    item.classList.toggle("open");
  });
});

const streamMessages = [
  "انبار: موجودی کالا بررسی شد و هشدار انقضا آماده ارسال است",
  "فروش: داده های سفارش برای گزارش مدیریتی به روز شد",
  "مرکز تماس: تماس ورودی ثبت شد و وارد شاخص های عملکرد شد",
  "سطح دسترسی: نقش کاربر با فرایند سازمان همگام شد",
  "داده: اطلاعات لجستیک پاکسازی و آماده تحلیل شد",
  "استقرار: سرویس جدید بدون توقف روی زیرساخت منتشر شد",
  "مالی: اعلان فاکتور، ضمانت نامه و تسویه در صف پردازش قرار گرفت",
  "داشبورد: شاخص های مدیریتی تازه سازی شدند",
  "GIS: رخداد عملیاتی روی نقشه بررسی و دسته بندی شد",
  "CRM: رفتار مشتری در مسیر تماس و فروش ثبت شد"
];

const stream = $("#stream");
function pushLog() {
  if (!stream) return;
  const log = document.createElement("div");
  log.className = "log";
  log.textContent = streamMessages[Math.floor(Math.random() * streamMessages.length)];
  stream.prepend(log);
  while (stream.children.length > 8) stream.lastElementChild.remove();
}

for (let i = 0; i < 6; i += 1) pushLog();
window.setInterval(pushLog, 1550);

$$(".magnetic").forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
    item.style.transform = `translate(${x}px, ${y}px)`;
  });
  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

function startScene() {
  const canvas = $("#bgScene");
  if (!canvas || typeof THREE === "undefined") return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 19;

  const group = new THREE.Group();
  scene.add(group);

  const nodes = [];
  const nodeGeometry = new THREE.SphereGeometry(0.055, 12, 12);
  const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x59e1df });
  const positions = [];

  for (let i = 0; i < 86; i += 1) {
    const angle = i * 0.42;
    const radius = 3.4 + (i % 11) * 0.34;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle * 0.82) * 4.6;
    const z = Math.sin(angle) * radius;
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.set(x, y, z);
    nodes.push(node);
    positions.push(x, y, z);
    group.add(node);
  }

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x8ee68d,
    transparent: true,
    opacity: 0.22
  });
  const linePositions = [];
  for (let i = 0; i < nodes.length - 1; i += 1) {
    const current = nodes[i].position;
    const next = nodes[(i + 7) % nodes.length].position;
    linePositions.push(current.x, current.y, current.z, next.x, next.y, next.z);
  }
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  group.add(new THREE.LineSegments(lineGeometry, lineMaterial));

  const particles = new THREE.Points(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(positions, 3)),
    new THREE.PointsMaterial({ color: 0xffd36a, size: 0.035, transparent: true, opacity: 0.8 })
  );
  group.add(particles);

  function resize() {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  window.addEventListener("resize", resize);
  resize();

  function animate(time) {
    group.rotation.y = time * 0.00008;
    group.rotation.x = Math.sin(time * 0.00035) * 0.12;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

startScene();
