import * as THREE from "three";

const params = {
  materialColor: "#dc8add",
};

export function scrollAnimations(scene, textureLoader, gui) {
  const gradientTex = textureLoader.load("./textures/gradients/3.jpg");
  gradientTex.magFilter = THREE.NearestFilter;

  const toonMaterial = new THREE.MeshToonMaterial({
    color: params.materialColor,
    gradientMap: gradientTex,
  });

  gui.addColor(params, "materialColor").onChange(() => {
    toonMaterial.color.set(params.materialColor);
    particlesMaterial.color.set(params.materialColor);
  });

  /** Meshes */
  const objectsDistance = 4;

  const mesh0 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    toonMaterial,
  );

  const mesh1 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), toonMaterial);

  const mesh2 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    toonMaterial,
  );

  // reposition meshes
  mesh1.position.y = -objectsDistance;
  mesh2.position.y = -objectsDistance * 2;

  mesh0.position.x = 2;
  mesh1.position.x = -2;
  mesh2.position.x = 2;

  /** Particles */
  const numParticles = 1000;
  const vertices = new Float32Array(numParticles * 3);
  for (let i = 0; i < numParticles; i++) {
    vertices[i * 3] = (Math.random() - 0.5) * 12; // x positon
    vertices[i * 3 + 1] =
      objectsDistance * 0.5 - Math.random() * objectsDistance * 3;
    vertices[i * 3 + 2] = (Math.random() - 0.5) * 12; // z position
  }
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertices, 3),
  );
  const particlesMaterial = new THREE.PointsMaterial({
    color: params.materialColor,
    sizeAttenuation: true,
    size: 0.03,
  });
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);

  /** Lights */
  const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
  directionalLight.position.set(1, 1, 0);

  scene.add(mesh0, mesh1, mesh2, directionalLight, particles);

  return [mesh0, mesh1, mesh2];
}
