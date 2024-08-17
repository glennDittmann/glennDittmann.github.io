import * as THREE from 'three';

export function runCubeExample(scene, gui, debugContainer, textureLoader) {
  
  const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
  const poolColorTexture = textureLoader.load('/textures/pool/color.jpg');
  const material = new THREE.MeshBasicMaterial({ map: poolColorTexture });
  const cubeMesh = new THREE.Mesh(geometry, material);
  
  const cubeFolder = gui.addFolder('Cube');
  
  debugContainer.subdivision = 2;
  
  cubeFolder.add(debugContainer, 'subdivision')
      .min(1)
      .max(20)
      .step(1)
      .onFinishChange(() => 
  {
      cubeMesh.geometry.dispose();
      cubeMesh.geometry = new THREE.BoxGeometry(1, 1, 1, debugContainer.subdivision, debugContainer.subdivision, debugContainer.subdivision);
  });
  
  cubeFolder.add(cubeMesh.position, 'y').min(- 3).max(3).step(0.01);
  cubeFolder.add(cubeMesh, 'visible');
  cubeFolder.add(material, 'wireframe');
  cubeFolder.addColor(debugContainer, 'color').onChange((value) => {
      material.color.set(debugContainer.color);
  });
 
  debugContainer.spin = () => {
      gsap.to(cubeMesh.rotation, { duration: 1, y: cubeMesh.rotation.y + Math.PI * 2 });
  }
  
  cubeFolder.add(debugContainer, 'spin');

  return cubeMesh;
}