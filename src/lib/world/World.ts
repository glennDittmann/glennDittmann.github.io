import { AnimationAction, type PerspectiveCamera, type Scene, type WebGLRenderer } from 'three';
import { createCamera } from './entities/camera';
import { createScene } from './entities/scene';
import { createRenderer } from './systems/renderer';
import { createCube } from './entities/cube';
import { Resizer } from './systems/Resizer';
import { createTetrahedron } from './entities/tetrahedron';
import { createLights } from './entities/lights';
import { Loop } from './systems/Loop';
import { createControls } from './systems/controls';
import type { OrbitControls } from 'three/examples/jsm/Addons.js';
import { createMeshGroup } from './entities/meshGroup';
import { createAxesHelper, createGridHelper } from './utils/helper';
import { birdNames, loadBirds } from './entities/birds/birds';

class World {
	private birdActions: AnimationAction[];
	private camera: PerspectiveCamera;
	private controls: OrbitControls;
	private focusedObjectName: string;
	private loop: Loop;
	private renderer: WebGLRenderer;
	private scene: Scene;

	constructor(canvasContainer: HTMLDivElement) {
		this.birdActions = [];
		this.focusedObjectName = "mainView";
		this.camera = createCamera();
		this.scene = createScene();
		this.renderer = createRenderer();
		this.loop = new Loop(this.camera, this.renderer, this.scene);
		this.controls = createControls(this.camera, this.renderer.domElement);
		canvasContainer.appendChild(this.renderer.domElement);

		const cube = createCube();
		const meshGroup = createMeshGroup();

		const tet = createTetrahedron();
		tet.position.add({ x: 5, y: 0, z: 0 });

		const {ambientLight, hemisphereLight, mainLight} = createLights();

		this.loop.updateables.push(this.controls, meshGroup);
        
		this.scene.add(createAxesHelper(), createGridHelper(), hemisphereLight, mainLight, meshGroup);

		const resizer = new Resizer(canvasContainer, this.camera, this.renderer);
	}

	async init() {
		const { flamingo, flamingoAction, parrot, parrotAction, stork, storkAction } = await loadBirds();

		this.controls.target.copy(parrot.position);
		this.focusedObjectName = parrot.name;

		this.loop.updateables.push(flamingo, parrot, stork);

		this.birdActions.push(flamingoAction, parrotAction, storkAction);

		this.scene.add(flamingo, parrot, stork);
	}

	focusNextBird() {
		let focusingBird = true;

		if (this.focusedObjectName === "mainView") {
			this.focusedObjectName = birdNames[0];
		} else if (this.focusedObjectName === birdNames[0]) {
			this.focusedObjectName = birdNames[1];
		} else if (this.focusedObjectName === birdNames[1]) {
			this.focusedObjectName = birdNames[2];
		} else {
			this.focusedObjectName = "mainView";
			focusingBird = false;
		}
		if (focusingBird) {
			const bird = this.scene.getObjectByName(this.focusedObjectName);
			if (bird) {
				this.controls.target.copy(bird?.position);
			} 
		} else {
			this.controls.target.set(0, 0, 0);
			this.camera.position.set(0, 5, 12);
		}
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	resetControls() {
		this.controls.reset();
	}

	start() {
		this.loop.start();
	}

	stop() {
		this.loop.stop();
	}

	animateControls() {
		this.controls.enabled = false;
		this.renderer.setAnimationLoop(() => {

				// animate camera
				if (this.camera.position.x < 15) {
					this.camera.position.x += 0.2;
				}
	
				// animate target
				if (this.controls.target.x < 5) {
					this.controls.target.x += 0.1;
				}
	
				if (this.controls.target.x >= 5 && this.camera.position.x >= 15) {
					this.loop.start();  // resets the animation loop to the main loop, i.e. camera movement and other stuff
					this.controls.enabled = true;
				}
	
				this.controls.update();
				this.renderer.render(this.scene, this.camera);
	
		});
	}

	setBirdActionsEffectiveWeights(weight: number) {
		this.birdActions.forEach(action => action.setEffectiveWeight(weight));
	}
}


export { World };
