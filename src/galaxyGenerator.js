import * as THREE from 'three';

const params = {
  branches: 3,
  colInside: '#ff6030',
  colOutisde: '#1b3984',
  count: 100000, 
  radius: 5,
  randomness: 0.2,
  randomnessPower: 3,
  size: 0.01,
  spin: 1,
};

let scene = null;
let geometry = null;
let material = null;
let particles = null;

const generateGalaxy = () => {
  if (particles !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(particles);
  }

  /** Color Objects */
  const colorInside = new THREE.Color(params.colInside);
  const colorOutside = new THREE.Color(params.colOutisde);
  
  /** Geometry */
  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);

  for (let i = 0; i < params.count; i++) {
    const x_idx = i * 3;

    /** Positions */
    const r = params.radius * Math.random();

    const branchAngle = (i % params.branches) / params.branches * Math.PI * 2;

    const spinAngle = r * params.spin;

    const randX = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * r;
    const randY = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * r;
    const randZ = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * r;

    positions[x_idx] = Math.cos(branchAngle + spinAngle) * r + randX;
    positions[x_idx + 1] = randY;
    positions[x_idx + 2] = Math.sin(branchAngle + spinAngle) * r + randZ;


    /** Colors */
    const mixedColor = colorInside.clone().lerp(colorOutside, r / params.radius);
    colors[x_idx] = mixedColor.r;
    colors[x_idx + 1] = mixedColor.g;
    colors[x_idx + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))


  /** Material */
  material = new THREE.PointsMaterial({
    size: params.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })

  /** Particles */
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

export function runGalaxyGenerator(newScene, gui) {
  scene = newScene;
  const galaxyFolder = gui.addFolder('Galaxy');
  galaxyFolder.add(params, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy);
  galaxyFolder.add(params, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy);
  galaxyFolder.add(params, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy);
  galaxyFolder.add(params, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy);
  galaxyFolder.add(params, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy);
  galaxyFolder.add(params, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy);
  galaxyFolder.add(params, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy);
  galaxyFolder.addColor(params, 'colInside').onFinishChange(generateGalaxy);
  galaxyFolder.addColor(params, 'colOutisde').onFinishChange(generateGalaxy);

  generateGalaxy(params, scene);
}
