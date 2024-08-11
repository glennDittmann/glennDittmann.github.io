import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import GUI from 'lil-gui';

/** Debug GUI */
const gui = new GUI({ title: 'Debug', width: 300, closeFolders: false });

window.addEventListener('keydown', (event) => {
    if (event.key === 'h') {
        gui.show(gui._hidden);
    }
})

const debugContainer = {};
debugContainer.color = '#ff89d8';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

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
const textureLoader = new THREE.TextureLoader(loadingManager);
// load all textures
const colorTexture = textureLoader.load('/textures/pool/color.jpg');
colorTexture.colorSpace = THREE.SRGBColorSpace;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

/** Cube */
const cubeTweaks = gui.addFolder('Cube');
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
debugContainer.subdivision = 2;
cubeTweaks.add(debugContainer, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => 
{
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, debugContainer.subdivision, debugContainer.subdivision, debugContainer.subdivision);
});

const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
cubeTweaks.add(mesh.position, 'y').min(- 3).max(3).step(0.01);
cubeTweaks.add(mesh, 'visible');
cubeTweaks.add(material, 'wireframe');
cubeTweaks.addColor(debugContainer, 'color').onChange((value) => {
    material.color.set(debugContainer.color);
});
debugContainer.spin = () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
}
cubeTweaks.add(debugContainer, 'spin');


/** Buffered Triangle */
const bufferGeometry = new THREE.BufferGeometry();
const posArray = new Float32Array(2 * 3 * 3);
for (let i = 0; i < posArray.length; i++) {
    posArray[i] = (Math.random() - 0.5) * 4;
}
const posAttr = new THREE.BufferAttribute(posArray, 3);
bufferGeometry.setAttribute('position', posAttr);
const mesh2 = new THREE.Mesh(bufferGeometry, material);

/** Camera */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);


/** Renderer */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

scene.add(camera, mesh, mesh2);


/** Controls */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


/** Animated render */
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const tick = () => {
    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();
