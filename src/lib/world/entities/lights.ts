import { AmbientLight, DirectionalLight, HemisphereLight } from "three";

export function createLights() {
    const mainLight = new DirectionalLight('white', 8);

    mainLight.position.set(10, 10, 30);

    const ambientLight = new AmbientLight('white', 2);

    const hemisphereLight = new HemisphereLight('white', 'darkslategrey', 2);

    return {ambientLight, hemisphereLight, mainLight};
}