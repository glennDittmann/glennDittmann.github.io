import * as THREE from 'three'

export function runLightsExample(scene) {
  /**
   * Objects
   */
  // Material
  const material = new THREE.MeshStandardMaterial()
  material.roughness = 0.4

  // Objects
  const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      material
  )
  sphere.position.x = - 1.5

  const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.75, 0.75),
      material
  )

  const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 32, 64),
      material
  )
  torus.position.x = 1.5

  const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      material
  )
  plane.rotation.x = - Math.PI * 0.5
  plane.position.y = - 0.65

  scene.add(sphere, cube, torus, plane)
}