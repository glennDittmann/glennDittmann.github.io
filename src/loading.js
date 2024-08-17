import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function createLoadingManager() {
  const loadingManager = new THREE.LoadingManager();
  
  loadingManager.onStart = () => {
      console.log('Loading started...');
  };
  
  loadingManager.onLoad = () => {
      console.log('Loading finished!');
  };
  
  loadingManager.onProgress = () => {
      console.log('Loading progressing...');
  };
  
  loadingManager.onError = () => {
      console.log('Loading error!');
  };

  return loadingManager;
}

export function createGLTFLoader() {
  const gltfLoader = new GLTFLoader();

  return gltfLoader;
}