import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import gsap from 'gsap';
import GUI from 'lil-gui';
import { runExperimentsExample } from './materialsExample';
import { runFontsExample } from './fontsExample';

/** Debug GUI */
const gui = new GUI({ title: 'Debug', width: 300, closeFolders: false });

const debugContainer = {};
debugContainer.color = '#ff89d8';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};


/** Event Listerner */
// Toggle Gui
window.addEventListener('keydown', (event) => {
    if (event.key === 'h') {
        gui.show(gui._hidden);
    }
})

// Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Double Click
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

/** Loading Manager */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log('loading started');
};
loadingManager.onLoad = () => {
    console.log('loading finished');
};
loadingManager.onProgress = () => {
    console.log('loading progressing');
};
loadingManager.onError = () => {
    console.log('loading error');
};

/** Textures */
const textureLoader = new THREE.TextureLoader(loadingManager);

// Pool
const poolColorTexture = textureLoader.load('/textures/pool/color.jpg');


/** Canvas */
const canvas = document.querySelector('canvas.webgl');


/** Scene */
const scene = new THREE.Scene();


/** Lights */
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.set(2, 3, 4);


/** Cube */
const cubeFolder = gui.addFolder('Cube');
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
debugContainer.subdivision = 2;
cubeFolder.add(debugContainer, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => 
{
    cubeMesh.geometry.dispose();
    cubeMesh.geometry = new THREE.BoxGeometry(1, 1, 1, debugContainer.subdivision, debugContainer.subdivision, debugContainer.subdivision);
});

const material = new THREE.MeshBasicMaterial({ map: poolColorTexture });
const cubeMesh = new THREE.Mesh(geometry, material);
cubeFolder.add(cubeMesh.position, 'y').min(- 3).max(3).step(0.01);
cubeFolder.add(cubeMesh, 'visible');
cubeFolder.add(material, 'wireframe');
cubeFolder.addColor(debugContainer, 'color').onChange((value) => {
    material.color.set(debugContainer.color);
});
debugContainer.spin = () => {
    gsap.to(cubeMesh.rotation, { duration: 1, y: cubeMesh.rotation.y + Math.PI * 2 });
}
cubeFolder.add(debugContainer, 'spin');


/** Camera */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;


/** Renderer */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

scene.add(camera, ambientLight, pointLight);


/** Controls */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


/** Materials Example */
let objects = [];
// objects = runExperimentsExample(gui, scene, textureLoader);

/** 3D Fonts Example */
runFontsExample(scene, textureLoader);

/** Animated render */
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
