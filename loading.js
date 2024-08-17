import * as THREE from 'three';

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