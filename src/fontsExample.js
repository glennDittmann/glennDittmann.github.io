import * as THREE from 'three';
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";

export function runFontsExample(scene, textureLoader){
  const fontLoader = new FontLoader();

  fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
      console.log('font loaded');

      /** Text */
      const matcapTexture = textureLoader.load('/textures/matcaps/4.png');
      matcapTexture.colorSpace = THREE.SRGBColorSpace;

      const textGeometry = new TextGeometry(
        'Glenn Dittmann',
        {
          font,
          size: 0.5,
          depth: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5
        }
      );
      
      textGeometry.center();

      const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

      const text = new THREE.Mesh(textGeometry, matcapMaterial);

      scene.add(text);


      /** Tetrahedrons */
      const tetGeometry = new THREE.TetrahedronGeometry(0.75, 0);
      for (let i = 0; i < 100; i++) {
        const tet = new THREE.Mesh(tetGeometry, matcapMaterial);

        // position randomly
        tet.position.x = (Math.random() - 0.5) * 10;
        tet.position.y = (Math.random() - 0.5) * 10;
        tet.position.z = (Math.random() - 0.5) * 10;

        // rotate randomly
        tet.rotation.x = Math.random() * Math.PI * 2;
        tet.rotation.y = Math.random() * Math.PI * 2;

        // scale randomly
        const scale = Math.random();
        tet.scale.set(scale, scale, scale);

        scene.add(tet);
      }
    }
  )
}