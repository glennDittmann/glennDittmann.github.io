export const rotateObjects = (objects, delta) => {
  objects.forEach((object) => {
      object.rotation.x = -0.15 * delta;
      object.rotation.y = -0.1 * delta;
  });
}

export const bounceObjects = (objects, delta) => {
  for (let i = 0; i < objects.length; i++) {
      objects[i].position.y = Math.sin(delta + i) * 1.5;
  };
}

export const bounceShadowedSphere = (sphere, sphereShadow, delta) => {
  // Update the sphere
  sphere.position.x = Math.cos(delta) * 1.5
  sphere.position.z = Math.sin(delta) * 1.5
  sphere.position.y = Math.abs(Math.sin(delta * 3))

  // Update the shadow
  sphereShadow.position.x = sphere.position.x
  sphereShadow.position.z = sphere.position.z
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3
}