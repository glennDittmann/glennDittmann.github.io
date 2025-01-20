import "./styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Timer } from "three/addons/misc/Timer.js";

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
  runHauntedHouse,
  ghostAnimationSettings,
} from "./experiences/hauntedHouse";

/** Debug GUI */
const gui = new GUI({ title: "Debug", width: 300, closeFolders: false });

const debugContainer = {};
debugContainer.color = "#ff89d8";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
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
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.set(0, 8, 14);
camera.lookAt(0, 0, 0);

/** Controls */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/** Renderer */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
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
const ghosts = runHauntedHouse(scene, textureLoader, gui);

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
scene.add(camera, ...objects);

/** Animate */
const clock = new THREE.Clock();
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
const timer = new Timer(); // Use the timer for the Haunted House experience

const tick = () => {
  const delta = clock.getElapsedTime();

  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Ghosts from the Haunted House experience
  ghosts.forEach((ghost, idx) => {
    const { radius, speed, angleModifier } = ghostAnimationSettings[idx];
    animateGhost(ghost, elapsedTime, radius, speed, angleModifier);
  });

  // Update controls
  controls.update(delta);

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

function animateGhost(ghost, elapsedTime, radius, speed, angleModifier) {
  const angle = angleModifier * elapsedTime * speed;
  ghost.position.x = Math.cos(angle) * radius;
  ghost.position.z = Math.sin(angle) * radius;
  ghost.position.y =
    Math.sin(angle) * Math.sin(angle * 2.35) * Math.sin(angle * 3.45);
}
