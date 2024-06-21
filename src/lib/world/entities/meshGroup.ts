import { Group, Mesh, MeshStandardMaterial, SphereGeometry } from "three";

export function createMeshGroup() {
  const group = new Group();

  const sphereGeom = new SphereGeometry(0.25, 160, 160);

  const material = new MeshStandardMaterial({color: 'indigo'});

  const sphere = new Mesh(sphereGeom, material);

  group.add(sphere);

  for (let i = 0; i < 1; i += 0.05) {
    const sphereClone = sphere.clone();

    sphereClone.position.x = Math.cos(2 * Math.PI * i);
    sphereClone.position.y = Math.sin(2 * Math.PI * i);
    sphereClone.position.z = -i * 5;

    sphereClone.scale.multiplyScalar(0.01 + i);
    
    group.add(sphereClone);
  }

  group.scale.multiplyScalar(2);

  const radPerSec = 30 * Math.PI / 180;
  group.tick = (delta: number) => {
    group.rotation.z -= radPerSec * delta;
    group.scale.x = Math.sin(group.rotation.z);
    group.scale.y = Math.sin(group.rotation.z);
    group.scale.z = Math.sin(group.rotation.z);
  };

  return group;

}