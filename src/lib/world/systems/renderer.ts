import { WebGLRenderer } from 'three';

export function createRenderer() {
	// TODO find out if physicallyCorectLights is activate now as default, cause it is not accessible via the renderer anymore.
	const renderer = new WebGLRenderer({antialias: true});

	return renderer;
}
