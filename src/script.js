import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
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


/** Event Listerner */
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

// Door
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// Matcap
const matcapTexture = textureLoader.load('/textures/matcaps/1.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Gradient
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg');

// Environment Map
const environmentMapTexture = textureLoader.load('/textures/environmentMap/2k.hdr');

/** Canvas */
const canvas = document.querySelector('canvas.webgl');

/** Scene */
const scene = new THREE.Scene();

/** Lights */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.set(2, 3, 4);

/** EnvironmentMap */
const rgbeLoader = new RGBELoader();
rgbeLoader.load('/textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = environmentMap;
    scene.environment = environmentMap;
});

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

const material = new THREE.MeshBasicMaterial({ map: poolColorTexture });
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


/** Sphere, Plane and Torus */
// MeshBasicMaterial
// const material2 = new THREE.MeshBasicMaterial();
// material2.map = doorColorTexture;
// material2.color = new THREE.Color(0xff0000);
// material2.wireframe = true;
// material2.transparent = true;
// material2.opacity = 0.5;
// material2.alphaMap = doorAlphaTexture;
// material2.side = THREE.DoubleSide;

// MeshNormalMaterial
// const material2 = new THREE.MeshNormalMaterial();
// material2.flatShading = true;

// MeshMatcapMaterial
// const material2 = new THREE.MeshMatcapMaterial();
// material2.matcap = matcapTexture;

// MeshDepthMaterial
// const material2 = new THREE.MeshDepthMaterial();

// MeshLambertMaterial
// const material2 = new THREE.MeshLambertMaterial();

// MeshPhongMaterial
// const material2 = new THREE.MeshPhongMaterial();
// material2.shininess = 100;
// material2.specular = new THREE.Color(0x1188ff);

// MeshToonMaterial
// const material2 = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material2.gradientMap = gradientTexture;

// MeshStandardMaterial
// const material2 = new THREE.MeshStandardMaterial();
// material2.metalness = 1;
// material2.roughness = 1;
// material2.map = doorColorTexture;
// material2.aoMap = doorAmbientOcclusionTexture;
// material2.displacementMap = doorHeightTexture;
// material2.displacementScale = 0.1;
// material2.metalnessMap = doorMetalnessTexture;
// material2.roughnessMap = doorRoughnessTexture;
// material2.normalMap = doorNormalTexture;
// material2.normalScale.set(0.5, 0.5);
// material2.transparent = true;
// material2.alphaMap = doorAlphaTexture;

// MeshPhysicalMaterial
const material2 = new THREE.MeshPhysicalMaterial();
material2.metalness = 0;
material2.roughness = 0;
// material2.map = doorColorTexture;
// material2.aoMap = doorAmbientOcclusionTexture;
// material2.displacementMap = doorHeightTexture;
// material2.displacementScale = 0.1;
// material2.metalnessMap = doorMetalnessTexture;
// material2.roughnessMap = doorRoughnessTexture;
// material2.normalMap = doorNormalTexture;
// material2.normalScale.set(0.5, 0.5);
// material2.transparent = true;
// material2.alphaMap = doorAlphaTexture;

gui.add(material2, 'metalness').min(0).max(1).step(0.0001);
gui.add(material2, 'roughness').min(0).max(1).step(0.0001);

// Clearcoat
// material2.clearcoat = 1;
// material2.clearcoatRoughness = 0;
// gui.add(material2, 'clearcoat').min(0).max(1).step(0.0001);
// gui.add(material2, 'clearcoatRoughness').min(0).max(1).step(0.0001);

// Sheen
// material2.sheen = 1;
// material2.sheenRoughness = 0.25;
// material2.sheenColor.set(1, 1, 1);
// gui.add(material2, 'sheen').min(0).max(1).step(0.0001);
// gui.add(material2, 'sheenRoughness').min(0).max(1).step(0.0001);
// gui.addColor(material2, 'sheenColor');

// Irridescence
material2.iridescence = 1;
material2.iridescenceIOR = 1;
material2.iridescenceThicknessRange = [ 100, 800 ];
// gui.add(material2, 'iridescence').min(0).max(1).step(0.0001);
// gui.add(material2, 'iridescenceIOR').min(0).max(2.333).step(0.0001);
// gui.add(material2.iridescenceThicknessRange, '0').min(0).max(1000).step(1);
// gui.add(material2.iridescenceThicknessRange, '1').min(0).max(1000).step(1);

// Transmission
material2.transmission = 1;
material2.ior = 1.5;
material2.thickness = 0.5;
gui.add(material2, 'transmission').min(0).max(1).step(0.0001);
gui.add(material2, 'ior').min(0).max(10).step(0.0001);
gui.add(material2, 'thickness').min(0).max(1).step(0.0001);


// Sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material2
);
sphere.position.x = -1.5;

// Plane
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material2
);

// Torus
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material2
);
torus.position.x = 1.5;

const objects = [sphere, plane, torus];


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

scene.add(camera, sphere, plane, torus);


/** Controls */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


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
