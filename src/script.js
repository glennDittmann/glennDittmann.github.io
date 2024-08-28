import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import gsap from 'gsap';
import GUI from 'lil-gui';
import { addEventListeners } from './events';
import { runCubeExample } from './cubeExample';
import { runMaterialsExample } from './materialsExample';
import { runFontsExample } from './fontsExample';
import { runLightsExample } from './lightsExample';
import { runRaycasterExample, handleRaycaster } from './raycasterExample';
import { createGLTFLoader, createLoadingManager } from './loading';
import { bounceObjects, bounceShadowedSphere, rotateObjects, waveParticles } from './animations';
import { createLights } from './lights';
import { runShadowsExample } from './shadowsExample';
import { runParticlesExample } from './particles';

/** Debug GUI */
const gui = new GUI({ title: 'Debug', width: 300, closeFolders: false });

const debugContainer = {};
debugContainer.color = '#ff89d8';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};


/** Loading Manager */
const loadingManager = createLoadingManager();


/** Texture Loader */
const textureLoader = new THREE.TextureLoader(loadingManager);


/** Canvas */
const canvas = document.querySelector('canvas.webgl');


/** Scene */
const scene = new THREE.Scene();


/** Lights */
// createLights(scene, gui);


/** Camera */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;


/** Controls */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


/** Renderer */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


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
const particles = runParticlesExample(scene, textureLoader);

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

const tick = () => {
    const delta = clock.getElapsedTime();
    
    controls.update(delta);

    // Update objects 
    // rotateObjects(objects, delta);
    // bounceObjects(objects, delta);
    // bounceShadowedSphere(sphere, sphereShadow, delta);
    // waveParticles(particles, delta);

    // Handle Raycaster
    // handleRaycaster(raycaster, mouse, camera, duck, objects);

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();
