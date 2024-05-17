import { BoxGeometry, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
    
const scene = new Scene();
scene.background = new Color('skyblue');

const fov = 35; // Field of View: how wide the camera's view is in degrees
const aspect = window.innerWidth / window.innerHeight; // Aspect Ratio: the ratio of the scene's width to its height
const near = 0.1; // Near Clipping Plane: anything closer to the camera than this won't be rendered
const far = 100; // Far Clipping Plane: anything further from the camera than this won't be rendered
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 10);

const width = 2;
const height = 2;
const depth = 2;
const geometry = new BoxGeometry(width, height, depth);

const material = new MeshBasicMaterial();

const cube = new Mesh(geometry, material);

scene.add(cube);

let renderer:WebGLRenderer;

export const createScene = (el:HTMLCanvasElement) => {
    renderer = new WebGLRenderer({ canvas: el });
    resize();
    animate();
    // renderer.render(scene, camera);
}

export const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

export const animate = () => {
    // requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};

window.addEventListener('resize', resize);