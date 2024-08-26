import * as THREE from 'three';

export function runShadowsExample (scene, gui, textureLoader) {
  /** Textures */
  const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg');
  bakedShadow.colorSpace = THREE.SRGBColorSpace;

  const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg');

  /** Lights */
  const ambiLight = new THREE.AmbientLight(0xffffff, 1);
  const ambiLightFolder = gui.addFolder('Ambient Light');
  ambiLightFolder.add(ambiLight, 'intensity').min(0).max(3).step(0.001);
  scene.add(ambiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(2, 2, -1);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 1;
  dirLight.shadow.camera.far = 6;
  dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.right = 2;
  dirLight.shadow.camera.bottom = -2;
  dirLight.shadow.camera.left = -2;
  dirLight.shadow.radius = 10;
  const dirLightCameraHelper = new THREE.CameraHelper(dirLight.shadow.camera);
  dirLightCameraHelper.visible = false;
  scene.add(dirLightCameraHelper);
  const dirLightFolder = gui.addFolder('Directional Light');
  dirLightFolder.add(dirLight, 'intensity').min(0).max(3).step(0.001);
  dirLightFolder.add(dirLight.position, 'x').min(-5).max(5).step(0.001);
  dirLightFolder.add(dirLight.position, 'y').min(-5).max(5).step(0.001);
  dirLightFolder.add(dirLight.position, 'z').min(-5).max(5).step(0.001);
  dirLightFolder.add(dirLightCameraHelper, 'visible').name('Helper visible');
  scene.add(dirLight);

  const spotLight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 1
  spotLight.shadow.camera.far = 6
  spotLight.position.set(0, 2, 2);
  scene.add(spotLight);
  scene.add(spotLight.target);
  const spotLightHelper = new THREE.CameraHelper(spotLight.shadow.camera);
  spotLightHelper.visible = false;
  scene.add(spotLightHelper);
  const spotLightFolder = gui.addFolder('Spot Light');
  spotLightFolder.add(spotLight, 'intensity').min(0).max(3).step(0.001);
  spotLightFolder.add(spotLightHelper, 'visible').name('Helper visible');

  const pointLight = new THREE.PointLight(0xffffff, 2.7);
  pointLight.position.set(-1, 1, 0);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.camera.near = 0.1
  pointLight.shadow.camera.far = 5
  scene.add(pointLight);
  const pointLightHelper = new THREE.CameraHelper(pointLight.shadow.camera);
  pointLightHelper.visible = false;
  scene.add(pointLightHelper);
  const pointLightFolder = gui.addFolder('Point Light');
  pointLightFolder.add(pointLight, 'intensity').min(0).max(3).step(0.001);
  pointLightFolder.add(pointLightHelper, 'visible').name('Helper visible');

  /** Material */
  const material = new THREE.MeshStandardMaterial();
  material.roughness = 0.4;
  const materialFolder = gui.addFolder('Material');
  materialFolder.add(material, 'metalness').min(0).max(1).step(0.001);
  materialFolder.add(material, 'roughness').min(0).max(1).step(0.001);

  
  /** Objects */
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
  );
  sphere.castShadow = true;

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
    // new THREE.MeshBasicMaterial({ map: bakedShadow })
  );
  plane.rotation.x = - Math.PI * 0.5;
  plane.position.y = - 0.5;
  plane.receiveShadow = true;

  const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({ color: 0x000000, alphaMap: simpleShadow, transparent: true })
  )
  sphereShadow.rotation.x = - Math.PI * 0.5;
  sphereShadow.position.y = plane.position.y + 0.01;

  scene.add(sphere, plane, sphereShadow);

  return [ sphere, sphereShadow ];
}