import { type PerspectiveCamera, type Scene, type WebGLRenderer } from 'three';
import { createCamera } from './entities/camera';
import { createScene } from './entities/scene';
import { createRenderer } from './systems/renderer';
import { createCube } from './entities/cube';
import { Resizer } from './systems/Resizer';
import { createTetrahedron } from './entities/tetrahedron';
import { createLights } from './entities/lights';
import { Loop } from './systems/Loop';

class World {
	private camera: PerspectiveCamera;
	private loop: Loop;
	private renderer: WebGLRenderer;
	private scene: Scene;

	constructor(canvasContainer: HTMLDivElement) {
		this.camera = createCamera();
		this.scene = createScene();
		this.renderer = createRenderer();
		this.loop = new Loop(this.camera, this.renderer, this.scene);
		canvasContainer.appendChild(this.renderer.domElement);

		const cube = createCube();

        const tet = createTetrahedron();
        tet.position.add({ x: 5, y: 0, z: 0 });

        const lights = createLights();

		this.loop.updateables.push(cube, tet);
        
        this.scene.add(cube, tet, lights);

		const resizer = new Resizer(canvasContainer, this.camera, this.renderer);
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	start() {
		this.loop.start();
	}

	stop() {
		this.loop.stop();
	}
}

export { World };
