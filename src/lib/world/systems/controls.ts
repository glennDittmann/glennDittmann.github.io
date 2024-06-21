import type { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export function createControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
    const controls = new OrbitControls(camera, canvas);

    controls.enableDamping = true;

    controls.tick = (delta: number) => {
        
        controls.update()
    };

    return controls;
}