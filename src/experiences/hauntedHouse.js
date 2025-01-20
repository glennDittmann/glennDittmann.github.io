import * as THREE from "three";
import { Sky } from "three/examples/jsm/Addons.js";

export const ghostAnimationSettings = [
  {
    radius: 4,
    speed: 0.5,
    angleModifier: 1,
  },
  {
    radius: 5,
    speed: 0.38,
    angleModifier: -1,
  },
  {
    radius: 6,
    speed: 0.23,
    angleModifier: 1,
  },
];

let scene = null;

export function runHauntedHouse(newScene, textureLoader, gui) {
  scene = newScene;

  /** Textures */
  // Floor
  const floorAlphaTex = textureLoader.load("./hauntedHouse/floor/alpha.webp");
  const floorColorTex = textureLoader.load(
    "./hauntedHouse/floor/coast_sand_rocks_02_1k/diff.webp",
  );
  const floorARMTex = textureLoader.load(
    "./hauntedHouse/floor/coast_sand_rocks_02_1k/arm.webp",
  );
  const floorNormalTex = textureLoader.load(
    "./hauntedHouse/floor/coast_sand_rocks_02_1k/nor_gl.webp",
  );
  const floorDisplacementTex = textureLoader.load(
    "./hauntedHouse/floor/coast_sand_rocks_02_1k/disp.webp",
  );

  let texs = [floorColorTex, floorARMTex, floorNormalTex, floorDisplacementTex];

  texs.forEach((tex) => {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 8);
  });
  floorColorTex.colorSpace = THREE.SRGBColorSpace;

  /** House */
  const houseGroup = createHouse(textureLoader);
  scene.add(houseGroup);

  /** Graves */
  const gravesGroup = createGraves(textureLoader);
  scene.add(gravesGroup);

  /** Floor */
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
      alphaMap: floorAlphaTex,
      transparent: true,
      map: floorColorTex,
      aoMap: floorARMTex,
      roughnessMap: floorARMTex,
      metalnessMap: floorARMTex,
      normalMap: floorNormalTex,
      displacementMap: floorDisplacementTex,
      displacementScale: 0.3,
      displacementBias: -0.1,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  gui
    .add(floor.material, "displacementScale")
    .min(0)
    .max(1)
    .step(0.001)
    .name("Floor Displacement Scale");
  gui
    .add(floor.material, "displacementBias")
    .min(-1)
    .max(1)
    .step(0.001)
    .name("Floor Displacement Bias");

  /** Ghosts */
  const ghost0 = new THREE.PointLight("#8800ff", 6);
  const ghost1 = new THREE.PointLight("#ff0088", 6);
  const ghost2 = new THREE.PointLight("#ff0000", 6);
  const ghosts = [ghost0, ghost1, ghost2];
  scene.add(ghost0, ghost1, ghost2);

  /** Lights */
  const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
  directionalLight.position.set(3, 2, -8);
  scene.add(directionalLight);

  const doorLight = new THREE.PointLight("#ff7d46", 5);
  doorLight.position.set(0, 2.2, 2.5);
  scene.add(doorLight);

  /** Sky */
  const sky = new Sky();
  sky.scale.setScalar(100);
  scene.add(sky);
  sky.material.uniforms["turbidity"].value = 10;
  sky.material.uniforms["rayleigh"].value = 3;
  sky.material.uniforms["mieCoefficient"].value = 0.1;
  sky.material.uniforms["mieDirectionalG"].value = 0.95;
  sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

  /** Fog */
  // scene.fog = new THREE.Fog("#02343f", 10, 13);
  scene.fog = new THREE.FogExp2("#02343f", 0.1);

  /** Shadows */
  directionalLight.castShadow = true;

  ghosts.forEach((ghost) => (ghost.castShadow = true));

  for (const grave of gravesGroup.children) {
    grave.castShadow = true;
    grave.receiveShadow = true;
  }

  // mapping for lights
  directionalLight.shadow.mapSize.width = 256;
  directionalLight.shadow.mapSize.height = 256;
  directionalLight.shadow.camera.top = 8;
  directionalLight.shadow.camera.right = 8;
  directionalLight.shadow.camera.bottom = -8;
  directionalLight.shadow.camera.left = -8;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 20;

  ghosts.forEach((ghost) => {
    ghost.shadow.mapSize.width = 256;
    ghost.shadow.mapSize.height = 256;
    ghost.shadow.camera.far = 10;
  });

  return ghosts;
}

function createHouse(textureLoader) {
  /** Textures */
  // Wall
  const wallColorTex = textureLoader.load(
    "./hauntedHouse/wall/castle_brick_broken_06_1k/diff.webp",
  );
  const wallARMTex = textureLoader.load(
    "./hauntedHouse/wall/castle_brick_broken_06_1k/arm.webp",
  );
  const wallNormalTex = textureLoader.load(
    "./hauntedHouse/wall/castle_brick_broken_06_1k/nor_gl.webp",
  );
  wallColorTex.colorSpace = THREE.SRGBColorSpace;

  //Roof
  const roofColorTex = textureLoader.load(
    "./hauntedHouse/roof/roof_slates_02_1k/diff.webp",
  );
  const roofARMTex = textureLoader.load(
    "./hauntedHouse/roof/roof_slates_02_1k/arm.webp",
  );
  const roofNormalTex = textureLoader.load(
    "./hauntedHouse/roof/roof_slates_02_1k/nor_gl.webp",
  );

  const roofTexs = [roofColorTex, roofARMTex, roofNormalTex];
  roofTexs.forEach((tex) => {
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.set(3, 1);
  });

  roofColorTex.colorSpace = THREE.SRGBColorSpace;

  // Bush
  const bushColorTex = textureLoader.load(
    "./hauntedHouse/bush/leaves_forest_ground_1k/diff.webp",
  );
  const bushARMTex = textureLoader.load(
    "./hauntedHouse/bush/leaves_forest_ground_1k/arm.webp",
  );
  const bushNormalTex = textureLoader.load(
    "./hauntedHouse/bush/leaves_forest_ground_1k/nor_gl.webp",
  );

  const bushTexs = [bushColorTex, bushARMTex, bushNormalTex];
  bushTexs.forEach((tex) => {
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.set(2, 1);
  });
  bushColorTex.colorSpace = THREE.SRGBColorSpace;

  // Door
  const doorColorTex = textureLoader.load("./textures/door/color.webp");
  const doorAlphaTex = textureLoader.load("./textures/door/alpha.webp");
  const doorAOTex = textureLoader.load("./textures/door/ambientOcclusion.webp");
  const doorHeightTex = textureLoader.load("./textures/door/height.webp");
  const doorNormalTex = textureLoader.load("./textures/door/normal.webp");
  const doorMetalnessTex = textureLoader.load("./textures/door/metalness.webp");
  const doorRoughnessTex = textureLoader.load("./textures/door/roughness.webp");
  doorColorTex.colorSpace = THREE.SRGBColorSpace;

  /** Meshes */
  const house = new THREE.Group();

  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
      map: wallColorTex,
      aoMap: wallARMTex,
      roughnessMap: wallARMTex,
      metalnessMap: wallARMTex,
      normalMap: wallNormalTex,
    }),
  );
  walls.position.y += 2.5 / 2;
  walls.castShadow = true;
  walls.receiveShadow = true;

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
      map: roofColorTex,
      aoMap: roofARMTex,
      roughnessMap: roofARMTex,
      metalnessMap: roofARMTex,
      normalMap: roofNormalTex,
    }),
  );
  roof.position.y += 2.5 + 1.5 / 2;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;

  /** Door */
  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
      map: doorColorTex,
      transparent: true,
      alphaMap: doorAlphaTex,
      aoMap: doorAOTex,
      displacementMap: doorHeightTex,
      displacementScale: 0.15,
      displacementBias: -0.04,
      normalMap: doorNormalTex,
      metalnessMap: doorMetalnessTex,
      roughnessMap: doorRoughnessTex,
    }),
  );
  door.position.y = 1;
  door.position.z = 2.0 + 0.01;

  /** Bushes */
  const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
  const bushMaterial = new THREE.MeshStandardMaterial({
    color: "#ccffcc",
    map: bushColorTex,
    aoMap: bushARMTex,
    roughnessMap: bushARMTex,
    metalnessMap: bushARMTex,
    normalMap: bushNormalTex,
  });

  const bush0 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush0.position.set(0.8, 0.2, 2.2);
  bush0.scale.setScalar(0.5);
  bush0.rotation.x = -0.75;

  const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush1.position.set(1.4, 0.1, 2.1);
  bush1.scale.setScalar(0.25);
  bush1.rotation.x = -0.75;

  const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush2.position.set(-0.8, 0.1, 2.2);
  bush2.scale.setScalar(0.4);
  bush2.rotation.x = -0.75;

  const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush3.position.set(-1, 0.05, 2.6);
  bush3.scale.setScalar(0.15);
  bush3.rotation.x = -0.75;

  house.add(walls);
  house.add(roof);
  house.add(door);
  house.add(bush0, bush1, bush2, bush3);

  return house;
}

function createGraves(textureLoader) {
  const numGraves = 30;

  /** Textures */
  // Grave
  const graveColorTex = textureLoader.load(
    "./hauntedHouse/grave/plastered_stone_wall_1k/diff.webp",
  );
  const graveARMTex = textureLoader.load(
    "./hauntedHouse/grave/plastered_stone_wall_1k/arm.webp",
  );
  const graveNormalTex = textureLoader.load(
    "./hauntedHouse/grave/plastered_stone_wall_1k/nor_gl.webp",
  );
  const graveTexs = [graveColorTex, graveARMTex, graveNormalTex];
  graveTexs.forEach((tex) => {
    tex.repeat.set(0.3, 0.4);
  });
  graveColorTex.colorSpace = THREE.SRGBColorSpace;

  /** Meshes */
  const graves = new THREE.Group();

  const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
  const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTex,
    aoMap: graveARMTex,
    roughnessMap: graveARMTex,
    metalnessMap: graveARMTex,
    normalMap: graveNormalTex,
  });

  for (let i = 0; i < numGraves; i++) {
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);

    // create random postion on a circle to place the grave
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 4;

    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const y = Math.random() * 0.4;
    grave.position.x = x;
    grave.position.z = z;
    grave.position.y = y;

    grave.rotation.set(
      (Math.random() - 0.5) * 0.4,
      (Math.random() - 0.5) * 0.4,
      (Math.random() - 0.5) * 0.4,
    );

    graves.add(grave);
  }

  return graves;
}
