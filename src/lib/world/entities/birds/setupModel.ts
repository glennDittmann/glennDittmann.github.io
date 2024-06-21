import { AnimationClip, AnimationMixer, VectorKeyframeTrack } from "three";
import type { GLTF } from "three/examples/jsm/Addons.js";

export function setupModel(data: GLTF) {
  const model = data.scene.children[0];

  const flyingClip = data.animations[0];
  // const moveAndScaleClip = new AnimationClip("moveAndScale", -1, [slowMoveTrack(), scaleTrack()]); // -1 to deduce clip length from track arrays
  
  const flyingMixer = new AnimationMixer(model);
  // const moveAndScaleMixer = new AnimationMixer(model);

  const flyingAction = flyingMixer.clipAction(flyingClip);
  flyingAction
    .startAt(1)
    .setEffectiveTimeScale(1.0)
    .play();

  // const moveAndScaleAction = moveAndScaleMixer.clipAction(moveAndScaleClip);
  // moveAndScaleAction
  //   .startAt(1)
  //   .setEffectiveTimeScale(1.0)
  //   .play();


  model.tick = (delta: number) => {
    flyingMixer.update(delta);
    // moveAndScaleMixer.update(delta);
  };

  return {model, action: flyingAction};
}

function slowMoveTrack() {
  const times = [0, 3, 6, 9, 12];
  const values = [0, 0, 0,  4, 4, 4, 8, 8, 8, 4, 4, 4, 0, 0, 0];

  return new VectorKeyframeTrack(".position", times, values);
}

function scaleTrack() {
  const times = [0, 3, 6, 9, 12];
  const values = [1.0, 1.0, 1.0,  2.0, 2.0, 2.0, 4.0, 4.0, 4.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0];
  
  return new VectorKeyframeTrack(".scale", times, values);
}