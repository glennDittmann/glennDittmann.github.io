import { DirectionalLight } from "three";

export function createLights() {
    const light = new DirectionalLight('white', 8);

    light.position.set(10, 10, 30);

    return light;
}