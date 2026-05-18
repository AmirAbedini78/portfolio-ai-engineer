const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("three-container").appendChild(renderer.domElement);

camera.position.z = 30;

const nodes = [];

for (let i = 0; i < 80; i++) {
  const geo = new THREE.SphereGeometry(0.1, 16, 16);

  const mat = new THREE.MeshBasicMaterial({
    color: 0x55ffff,
  });

  const p = new THREE.Mesh(geo, mat);

  p.position.x = (Math.random() - 0.5) * 40;

  p.position.y = (Math.random() - 0.5) * 20;

  p.position.z = (Math.random() - 0.5) * 20;

  scene.add(p);

  nodes.push(p);
}

function animate() {
  requestAnimationFrame(animate);

  nodes.forEach((n) => {
    n.rotation.y += 0.01;

    n.position.y += Math.sin(Date.now() * 0.001 + n.position.x) * 0.002;
  });

  scene.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();
