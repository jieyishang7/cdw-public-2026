// spatial-canvas-threejs.js
// Three.js scene: grid, primitives, and orbit controls

(function() {
  // Scene, camera, renderer setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 800 / 400, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(800, 400);
  renderer.setClearColor(0xf0f0f0); // Light grey background

  document.getElementById('threejs-container-2').appendChild(renderer.domElement);

  // Add grid helper
  const grid = new THREE.GridHelper(16, 32, 0xcccccc, 0xcccccc);
  scene.add(grid);

  // Add ambient and directional light
  const ambient = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
  dirLight.position.set(8, 12, 6);
  dirLight.castShadow = true;
  scene.add(dirLight);

  // Add fog for depth
  scene.fog = new THREE.Fog(0xf0f0f0, 8, 20);

  // Create abstract geometry: 3 boxes and 6 cones
  const group = new THREE.Group();

  const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 0.35, metalness: 0.25 });
  const coneMaterial1 = new THREE.MeshStandardMaterial({ color: 0xffc107, roughness: 0.45, metalness: 0.05 });
  const coneMaterial2 = new THREE.MeshStandardMaterial({ color: 0x3264a8, roughness: 0.2, metalness: 0.2 });

  const boxSize = 1.5;
  const boxHeight = 1;
  const boxDepth = 1;

  for (let i = 0; i < 3; i++) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(boxSize, boxHeight, boxDepth), boxMaterial);
    box.position.set(-3 + i * 3.0, boxHeight / 2, 0);
    box.rotation.set(0.05 * i, 0.2 * i, -0.04 * i);
    group.add(box);
  }

  for (let i = 0; i < 6; i++) {
    const coneHeight = 1.4 + (i % 2) * 0.3;
    const coneRadius = 0.35 + (i % 3) * 0.08;
    const coneMaterial = i % 2 === 0 ? coneMaterial1 : coneMaterial2;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(coneRadius, coneHeight, 32), coneMaterial);
    const xIndex = i % 3;
    const zOffset = i < 3 ? -1.4 : 1.4;
    cone.position.set(-3 + xIndex * 3.0, boxHeight + coneHeight / 2 + 0.1, zOffset);
    cone.rotation.set(-0.1, 0.15 * i, 0);
    group.add(cone);
  }

  scene.add(group);

  // Camera position
  camera.position.set(10, 7, 12);
  camera.lookAt(0, 1.5, 0);

  // OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.screenSpacePanning = false;
  controls.minDistance = 4;
  controls.maxDistance = 40;
  controls.target.set(0, 1, 0);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
})(); 