import { BoxGeometry, MathUtils, MeshStandardMaterial, TextureLoader } from 'three';
import { TickableMesh } from '../systems/Loop';
import uvTestBW from '$lib/textures/uv-test-bw.png';

export function createCube(): TickableMesh {
	const geometry = new BoxGeometry(2, 2, 2);

	const material = createMaterial();

	const cube = new TickableMesh(geometry, material);

	cube.rotation.set(-0.5, -0.1, 0.8);

	const radiansPerSecond = MathUtils.degToRad(30);

	cube.tick = (delta: number) => {
		cube.rotation.x += radiansPerSecond * delta;
		cube.rotation.y += radiansPerSecond * delta;
		cube.rotation.z += radiansPerSecond * delta;
	}

	return cube;
}

export function createMaterial() {
	const textureLoader = new TextureLoader();

	const textureBW = textureLoader.load(uvTestBW);

	const material = new MeshStandardMaterial({color: 'white', map: textureBW});

	return material;
}