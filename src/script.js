import "./styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Timer } from "three/addons/misc/Timer.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import gsap from "gsap";
import GUI from "lil-gui";
import { addEventListeners } from "./events";
import { runCubeExample } from "./cubeExample";
import { runMaterialsExample } from "./materialsExample";
import { runFontsExample } from "./fontsExample";
import { runLightsExample } from "./lightsExample";
import { runRaycasterExample, handleRaycaster } from "./raycasterExample";
import { createGLTFLoader, createLoadingManager } from "./loading";
import {
  bounceObjects,
  bounceShadowedSphere,
  rotateObjects,
  waveParticles,
} from "./animations";
import { createLights } from "./lights";
import { runShadowsExample } from "./shadowsExample";
import { runParticlesExample } from "./particles";
import { runGalaxyGenerator } from "./galaxyGenerator";
import {
  animateGhost,
  runHauntedHouse,
  ghostAnimationSettings,
} from "./experiences/hauntedHouse";
import { scrollAnimations } from "./experiences/scrollAnimation";
import vertexShader from "./shaders/flag/vertex.glsl";
import fragmentShader from "./shaders/flag/fragment.glsl";

/** Debug GUI */
const gui = new GUI({ title: "Debug", width: 300, closeFolders: false });

const debugContainer = {};
debugContainer.color = "#ff89d8";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const settings = {
  controlsActive: true,
  camera: {
    fov: 35,
    aspect: sizes.width / sizes.height,
    near: 0.1,
    far: 100,
  },
  scrollAnimationsExperience: false,
};

/** Loading Manager */
const loadingManager = createLoadingManager();

/** Texture Loader */
const textureLoader = new THREE.TextureLoader(loadingManager);

/** Canvas */
const canvas = document.querySelector("canvas.webgl");

/** Scene */
const scene = new THREE.Scene();

/** Lights */
// createLights(scene, gui);

/** Camera */
const cameraGroup = new THREE.Group();
const camera = new THREE.PerspectiveCamera(
  settings.camera.fov,
  settings.camera.aspect,
  settings.camera.near,
  settings.camera.far,
);
camera.position.z = 6;
cameraGroup.add(camera);

/** Controls */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/** Renderer */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // for the scroll animations experience
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/** Shadows */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

// Cast and receive shadows

/** Mouse */
const mouse = new THREE.Vector2();

/** Event Listerner */
addEventListeners(camera, mouse, renderer, sizes, gui);

/** Experiments with Objects storage for all examples */
let objects = [];

/** Cube */
// objects.push(runCubeExample(gui, debugContainer, textureLoader));

/** Materials Example */
// objects.push(...runMaterialsExample(gui, scene, textureLoader));

/** 3D Fonts Example */
// runFontsExample(scene, textureLoader);

/** Lights Example */
// runLightsExample(scene);

/** Shadows Example */
// const [sphere, sphereShadow] = runShadowsExample(scene, gui, textureLoader);

/** Particles Example */
// const particles = runParticlesExample(scene, textureLoader);

/** Galaxy Generator */
// runGalaxyGenerator(scene, gui);

/** Haunted House */
// Note: this scene creates its own lights
// const ghosts = runHauntedHouse(scene, textureLoader, gui);

/** Scroll Animation */
const scrollMeshes = scrollAnimations(scene, textureLoader, gui);

/** Load Models */
// const gltfLoader = new GLTFLoader();

/** Shaders */
const geo = new THREE.PlaneGeometry(1, 1, 32, 32);
const count = geo.attributes.position.count;
const randoms = new Float32Array(count);

for (let i = 0; i < count; i++) {
  randoms[i] = Math.random();
}

geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

const shader = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(10, 5) },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("orange") },
  },
});

gui
  .add(shader.uniforms.uFrequency.value, "x")
  .min(0)
  .max(20)
  .step(0.01)
  .name("frequencyX");
gui
  .add(shader.uniforms.uFrequency.value, "y")
  .min(0)
  .max(20)
  .step(0.01)
  .name("frequencyY");

const mesh = new THREE.Mesh(geo, shader);
mesh.scale.y = 2 / 3;
scene.add(mesh);

/** Raycaster Example */
// objects.push(...runRaycasterExample(gui, debugContainer, textureLoader));
// const raycaster = new THREE.Raycaster();

// const gltfLoader = createGLTFLoader();
// let duck = null;
// gltfLoader.load(
//     './models/duck/glTF-Binary/Duck.glb',
//     (gltf) => {
//         duck = gltf.scene;
//         scene.add(duck);
//     }
// );

/** Set up scene */
scene.add(cameraGroup, ...objects);

/** Scroll */
let scrollY = window.scrollY;
let currentSection = 0;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;

  const newSection = Math.round(scrollY / sizes.height); // scrolly / sizes.height goes up by 1 unit per section (bc our css set the secs to 1vp height point)
  if (newSection != currentSection) {
    currentSection = newSection;

    gsap.to(scrollMeshes[currentSection].rotation, {
      duration: 1.5,
      ease: "power2.inOut",
      x: "+=6",
      y: "+=3",
      z: "+=1.5",
    });
  }
});

/** Cursor */
let cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

/** Animate */
const clock = new THREE.Clock();
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
const timer = new Timer(); // Use the timer for the Haunted House experience

const tick = () => {
  const delta = clock.getElapsedTime();
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();
  const deltaTime = timer.getDelta();

  // Ghosts from the Haunted House experience
  // ghosts.forEach((ghost, idx) => {
  //   const { radius, speed, angleModifier } = ghostAnimationSettings[idx];
  //   animateGhost(ghost, elapsedTime, radius, speed, angleModifier);
  // });

  // Meshes and Camera from the Scroll Animation experience
  if (settings.scrollAnimationsExperience) {
    // rotate meshes
    scrollMeshes.forEach((mesh) => {
      mesh.rotation.x += deltaTime * 0.1;
      mesh.rotation.y += deltaTime * 0.2;
    });

    // move camera with scroll
    camera.position.y = -(scrollY / sizes.height) * 4; // scrollY / sizes.height goes down by 1 unit per section

    // parralax effect on mouse move
    const parallaxX = cursor.x * 0.5;
    const parallaxY = -cursor.y * 0.5;
    cameraGroup.position.x +=
      (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y +=
      (parallaxY - cameraGroup.position.y) * 5 * deltaTime;
  }

  // Update controls
  if (settings.controlsActive) {
    controls.update(delta);
  }

  // Update shader materials
  shader.uniforms.uTime.value = elapsedTime;

  // Update objects
  // rotateObjects(objects, delta);
  // bounceObjects(objects, delta);
  // bounceShadowedSphere(sphere, sphereShadow, delta);
  // waveParticles(particles, delta);

  // Handle Raycaster
  // handleRaycaster(raycaster, mouse, camera, duck, objects);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
