import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import gsap from 'gsap';
import GUI from 'lil-gui';
import { addEventListeners } from './events';
import { runExperimentsExample } from './materialsExample';
import { runFontsExample } from './fontsExample';
import { runLightsExample } from './lightsExample';
import { runCubeExample } from './cubeExample';
import { createLoadingManager } from '../loading';

/** Debug GUI */
const gui = new GUI({ title: 'Debug', width: 300, closeFolders: false });

const debugContainer = {};
debugContainer.color = '#ff89d8';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};


/** Event Listerner */
addEventListeners(gui);

/** Loading Manager */
const loadingManager = createLoadingManager();


/** Texture Loader */
const textureLoader = new THREE.TextureLoader(loadingManager);


/** Canvas */
const canvas = document.querySelector('canvas.webgl');


/** Scene */
const scene = new THREE.Scene();


/** Lights */
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.set(2, 3, 4);


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


/** Experiments with Objects storage for all examples */
let objects = [];

/** Cube */
objects.push(runCubeExample(scene, gui, debugContainer, textureLoader));

/** Materials Example */
// objects.push(...runExperimentsExample(gui, scene, textureLoader));

/** 3D Fonts Example */
// runFontsExample(scene, textureLoader);

/** Lights Example */
// runLightsExample(scene);


/** Set up scene */
scene.add(camera, ambientLight, pointLight, ...objects);


/** Animate */
const clock = new THREE.Clock();
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    
    controls.update();

    // Update objects 
    objects.forEach((object) => {
        object.rotation.x = -0.15 * elapsedTime;
        object.rotation.y = -0.1 * elapsedTime;
    });

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();
