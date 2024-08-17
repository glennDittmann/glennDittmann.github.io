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