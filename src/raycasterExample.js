import * as THREE from 'three';

export function runRaycasterExample(gui, debugContainer, textureLoader) {
  /** Objects */
  const sphere0 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: 'white' })
  );
  sphere0.position.x = -2;

  const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: 'white' })
  );

  const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: 'white' })
  );
  sphere2.position.x = 2;

  return [sphere0, sphere1, sphere2];
}

export const handleRaycaster = (raycaster, mouse, camera, duck, objects) => {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(objects);

    if (duck) {
        const duckIntersects = raycaster.intersectObjects([duck]);

        if (duckIntersects.length > 0) {
            duck.scale.set(1.5, 1.5, 1.5);
        } else {
            duck.scale.set(1, 1, 1);
        }
    }

    for (const object of objects) {
        if (!intersects.find((intersect) => intersect.object === object)) {
            object.material.color.set('white');
        }
    }

    for (const intersect of intersects) {
        intersect.object.material.color.set('red');
    }
}