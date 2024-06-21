
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Flamingo from "$lib/models/Flamingo.glb"
import Parrot from "$lib/models/Parrot.glb"
import Stork from "$lib/models/Stork.glb"
import { setupModel } from "./setupModel";

export const birdNames = ["flamingo", "parrot", "stork"];

export async function loadBirds() {
  const loader = new GLTFLoader();

  const [flamingoData, parrotData, storkData] = await Promise.all([
    loader.loadAsync(Flamingo),
    loader.loadAsync(Parrot),
    loader.loadAsync(Stork)
  ]);

  const {model: flamingo, action: flamingoAction} = setupModel(flamingoData);
  flamingo.name = birdNames[0];
  flamingo.position.set(-5, 0, 0);

  const {model: parrot, action: parrotAction} = setupModel(parrotData);
  parrot.name = birdNames[1];
  parrot.position.set(0, 0, 2.5);

  const {model: stork, action: storkAction} = setupModel(storkData);
  stork.name = birdNames[2];
  stork.position.set(5.0, 0, 0);

  return {
    flamingo,
    flamingoAction,
    parrot,
    parrotAction,
    stork,
    storkAction
  };
}