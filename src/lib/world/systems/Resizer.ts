import type { PerspectiveCamera, WebGLRenderer } from 'three';

export class Resizer {
	constructor(canvasContainer: HTMLDivElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
		
		this.setSize(camera, canvasContainer, renderer);

		window.addEventListener('resize', () => {
			this.setSize(camera, canvasContainer, renderer);
		});
	}

	private setSize(camera: PerspectiveCamera, canvasContainer: HTMLDivElement, renderer: WebGLRenderer) {
		camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight; // Set the camera's aspect ratio
		camera.updateProjectionMatrix(); // Update the camera's frustum

		renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight); // Update the size of the renderer and the canvas

		renderer.setPixelRatio(window.devicePixelRatio); // Set the pixel ratio (for mobile devices)
	}
}
