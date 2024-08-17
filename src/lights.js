import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

export function createLights(scene, gui) {
  let lights = [];

  const lightsFolder = gui.addFolder('Lights').open();

  /** MINIMAL COST */
  /** Ambient Light */
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  lights.push(ambientLight);
  lightsFolder.addFolder('Ambient Light').add(ambientLight, 'intensity').min(0).max(1).step(0.01);


  /** Hemisphere Light */
  const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9);
  lights.push(hemisphereLight);
  
  const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
  hemisphereLightHelper.visible = false;
  lights.push(hemisphereLightHelper);
  
  const hemisphereLightFolder = lightsFolder.addFolder('Hemisphere Light')
  hemisphereLightFolder.add(hemisphereLight, 'intensity').min(0).max(1).step(0.01);
  hemisphereLightFolder.add(hemisphereLightHelper, 'visible').name('Helper Visible');
  
  
  /** MODERATE COST */
  /** Directional Light */
  const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9);
  directionalLight.position.set(1, 0.25, 0);
  lights.push(directionalLight);
  
  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
  directionalLightHelper.visible = false;
  lights.push(directionalLightHelper);
  
  let directionalLightFolder = lightsFolder.addFolder('Directional Light');
  directionalLightFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.01);
  directionalLightFolder.add(directionalLightHelper, 'visible').name('Helper Visible');

  /** Point Light */
  const pointLight = new THREE.PointLight(0xff9000, 1.5, 0, 2);
  pointLight.position.set(0, 1, 1);
  lights.push(pointLight);
  scene.add(pointLight);
  
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
  pointLightHelper.visible = false;
  lights.push(pointLightHelper);
  
  const pointLightFolder = lightsFolder.addFolder('Point Light');
  pointLightFolder.add(pointLight, 'intensity').min(0).max(1.5).step(0.01);
  pointLightFolder.add(pointLightHelper, 'visible').name('Helper Visible');


  /** HIGH COST */
  /** Reactarea Light */
  const rectareaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
  rectareaLight.position.set(-1.5, 0, 1.5);
  rectareaLight.lookAt(new THREE.Vector3());
  lights.push(rectareaLight);
  
  const rectAreaLightHelper = new RectAreaLightHelper(rectareaLight);
  rectAreaLightHelper.visible = false;
  lights.push(rectAreaLightHelper);
  
  const rectAreaLightFolder = lightsFolder.addFolder('Rectarea Light');
  rectAreaLightFolder.add(rectareaLight, 'intensity').min(0).max(2).step(0.01);
  rectAreaLightFolder.add(rectAreaLightHelper, 'visible').name('Helper Visible');

  /** Spot Light */
  const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1);
  spotLight.position.set(0, 2, 3);
  lights.push(spotLight);
  
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  spotLightHelper.visible = false;
  lights.push(spotLightHelper);
  
  const spotLightFolder = lightsFolder.addFolder('Spot Light');
  spotLightFolder.add(spotLight, 'intensity').min(0).max(4.5).step(0.01);
  spotLightFolder.add(spotLightHelper, 'visible').name('Helper Visible');

  scene.add(...lights);
}