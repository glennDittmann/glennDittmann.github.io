import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

const sizes = {
    width: 800,
    height: 600
};

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x91a889 });
const mesh = new THREE.Mesh(geometry, material);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

scene.add(camera, mesh);

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
