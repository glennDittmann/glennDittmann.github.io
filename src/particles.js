import * as THREE from 'three';

export function runParticlesExample(scene, texLoader) {
  const tex = texLoader.load('/textures/particles/2.png');

  const numParticles = 20000;
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(numParticles * 3);
  const colors = new Float32Array(numParticles * 3);
  
  for (let i = 0; i < numParticles * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    // color: 'green',
    alphaMap: tex,
    transparent: true,
    // alphaTest: 0.001
    // depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);

  scene.add(particles);

  return particles;
}