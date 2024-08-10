import './styles.css';
import * as THREE from 'three';
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

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

scene.add(camera, mesh);

/** Animated render */
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const tick = () => {

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();
