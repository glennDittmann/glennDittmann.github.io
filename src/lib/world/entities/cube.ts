import { BoxGeometry, MathUtils, MeshStandardMaterial } from 'three';
import { TickableMesh } from '../systems/Loop';

export function createCube(): TickableMesh {
	const geometry = new BoxGeometry(2, 2, 2);

	const material = new MeshStandardMaterial({color: 'purple'});

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
