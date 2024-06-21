import { MathUtils, TetrahedronGeometry } from "three";
import { TickableMesh } from "../systems/Loop";
import { createMaterial } from "./cube";

export function createTetrahedron() {
    const geometry = new TetrahedronGeometry(2, 0);

    const material = createMaterial();
    
    const tet = new TickableMesh(geometry, material);

    tet.rotation.set(0.1, -0.1, 0.8);

    const radiansPerSecond = MathUtils.degToRad(90);
    
    let moveDir = 1;
    tet.tick = (delta: number) => {
        tet.rotation.x += radiansPerSecond * delta;
        tet.rotation.y += radiansPerSecond * delta;
        tet.rotation.z += radiansPerSecond * delta;

        if (tet.position.x > 25) {
            moveDir = -1; // aka left
        } else if (tet.position.x < 5) {
            moveDir = 1; // aka right
        }

        tet.position.x += moveDir * 5 * delta;
    }

    return tet;
}