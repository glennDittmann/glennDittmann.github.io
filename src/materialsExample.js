import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export function runExperimentsExample(gui, scene, textureLoader) {
  /** Textures */
  // Door
  const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
  doorColorTexture.colorSpace = THREE.SRGBColorSpace;
  const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
  const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
  const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
  const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
  const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
  const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

  // Matcap
  const matcapTexture = textureLoader.load('/textures/matcaps/1.png');
  matcapTexture.colorSpace = THREE.SRGBColorSpace;

  // Gradient
  const gradientTexture = textureLoader.load('/textures/gradients/5.jpg');

  // Environment Map
  const environmentMapTexture = textureLoader.load('/textures/environmentMap/2k.hdr');


  /** EnvironmentMap */
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load('/textures/environmentMap/2k.hdr', (environmentMap) => {
      environmentMap.mapping = THREE.EquirectangularReflectionMapping;

      scene.background = environmentMap;
      scene.environment = environmentMap;
  });


  /** Materials */
  // MeshBasicMaterial
  // const material2 = new THREE.MeshBasicMaterial();
  // material2.map = doorColorTexture;
  // material2.color = new THREE.Color(0xff0000);
  // material2.wireframe = true;
  // material2.transparent = true;
  // material2.opacity = 0.5;
  // material2.alphaMap = doorAlphaTexture;
  // material2.side = THREE.DoubleSide;

  // MeshNormalMaterial
  // const material2 = new THREE.MeshNormalMaterial();
  // material2.flatShading = true;

  // MeshMatcapMaterial
  // const material2 = new THREE.MeshMatcapMaterial();
  // material2.matcap = matcapTexture;

  // MeshDepthMaterial
  // const material2 = new THREE.MeshDepthMaterial();

  // MeshLambertMaterial
  // const material2 = new THREE.MeshLambertMaterial();

  // MeshPhongMaterial
  // const material2 = new THREE.MeshPhongMaterial();
  // material2.shininess = 100;
  // material2.specular = new THREE.Color(0x1188ff);

  // MeshToonMaterial
  // const material2 = new THREE.MeshToonMaterial();
  // gradientTexture.minFilter = THREE.NearestFilter;
  // gradientTexture.magFilter = THREE.NearestFilter;
  // gradientTexture.generateMipmaps = false;
  // material2.gradientMap = gradientTexture;

  // MeshStandardMaterial
  // const material2 = new THREE.MeshStandardMaterial();
  // material2.metalness = 1;
  // material2.roughness = 1;
  // material2.map = doorColorTexture;
  // material2.aoMap = doorAmbientOcclusionTexture;
  // material2.displacementMap = doorHeightTexture;
  // material2.displacementScale = 0.1;
  // material2.metalnessMap = doorMetalnessTexture;
  // material2.roughnessMap = doorRoughnessTexture;
  // material2.normalMap = doorNormalTexture;
  // material2.normalScale.set(0.5, 0.5);
  // material2.transparent = true;
  // material2.alphaMap = doorAlphaTexture;

  // MeshPhysicalMaterial
  const material2 = new THREE.MeshPhysicalMaterial();
  material2.metalness = 0;
  material2.roughness = 0;
  // material2.map = doorColorTexture;
  // material2.aoMap = doorAmbientOcclusionTexture;
  // material2.displacementMap = doorHeightTexture;
  // material2.displacementScale = 0.1;
  // material2.metalnessMap = doorMetalnessTexture;
  // material2.roughnessMap = doorRoughnessTexture;
  // material2.normalMap = doorNormalTexture;
  // material2.normalScale.set(0.5, 0.5);
  // material2.transparent = true;
  // material2.alphaMap = doorAlphaTexture;

  gui.add(material2, 'metalness').min(0).max(1).step(0.0001);
  gui.add(material2, 'roughness').min(0).max(1).step(0.0001);

  // Clearcoat
  // material2.clearcoat = 1;
  // material2.clearcoatRoughness = 0;
  // gui.add(material2, 'clearcoat').min(0).max(1).step(0.0001);
  // gui.add(material2, 'clearcoatRoughness').min(0).max(1).step(0.0001);

  // Sheen
  // material2.sheen = 1;
  // material2.sheenRoughness = 0.25;
  // material2.sheenColor.set(1, 1, 1);
  // gui.add(material2, 'sheen').min(0).max(1).step(0.0001);
  // gui.add(material2, 'sheenRoughness').min(0).max(1).step(0.0001);
  // gui.addColor(material2, 'sheenColor');

  // Irridescence
  material2.iridescence = 1;
  material2.iridescenceIOR = 1;
  material2.iridescenceThicknessRange = [ 100, 800 ];
  // gui.add(material2, 'iridescence').min(0).max(1).step(0.0001);
  // gui.add(material2, 'iridescenceIOR').min(0).max(2.333).step(0.0001);
  // gui.add(material2.iridescenceThicknessRange, '0').min(0).max(1000).step(1);
  // gui.add(material2.iridescenceThicknessRange, '1').min(0).max(1000).step(1);

  // Transmission
  material2.transmission = 1;
  material2.ior = 1.5;
  material2.thickness = 0.5;
  gui.add(material2, 'transmission').min(0).max(1).step(0.0001);
  gui.add(material2, 'ior').min(0).max(10).step(0.0001);
  gui.add(material2, 'thickness').min(0).max(1).step(0.0001);


  /** Objects */
  // Sphere
  const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 64, 64),
      material2
  );
  sphere.position.x = -1.5;

  // Plane
  const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 100, 100),
      material2
  );

  // Torus
  const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 64, 128),
      material2
  );
  torus.position.x = 1.5;

  const objects = [sphere, plane, torus];


  scene.add(...objects);

  return objects;
}