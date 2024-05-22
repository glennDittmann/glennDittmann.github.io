import { PerspectiveCamera } from 'three';

export function createCamera() {
	const camera = new PerspectiveCamera(
		35, // Field of View: how wide the camera's view is in degrees
		1, // Aspect Ratio: the ratio of the scene's width to its height
		0.1, // Near Clipping Plane: anything closer to the camera than this won't be rendered
		100 // Far Clipping Plane: anything further from the camera than this won't be rendered
	);

	camera.position.set(0, 0, 10); // move camera back so we can see the scene

	return camera;
}
