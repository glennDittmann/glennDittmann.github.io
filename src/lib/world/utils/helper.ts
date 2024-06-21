import { AxesHelper, GridHelper } from "three";

export function createAxesHelper(): AxesHelper {
  const axesHelper = new AxesHelper(3);

  return axesHelper;
}

export function createGridHelper(): GridHelper {
  const gridHelper = new GridHelper(10);

  return gridHelper;
}