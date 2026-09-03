import {
  selectShowVertices,
  toggleAxis,
  toggleGrid,
  toggleVertices,
} from "../../store/features/experienceSettings/experienceSettingsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Footer.css";

export default function Footer() {
  const dispatch = useAppDispatch();
  const axisActive = useAppSelector((state) => state.experienceSettings.axisActive);
  const gridActive = useAppSelector((state) => state.experienceSettings.gridActive);
  const showVertices = useAppSelector(selectShowVertices);

  return (
    <footer className="footer">
      <div className="footer-controls wa-cluster wa-gap-m wa-justify-content-center">
        <wa-switch checked={gridActive} onChange={() => dispatch(toggleGrid())}>
          Grid
        </wa-switch>
        <wa-switch checked={axisActive} onChange={() => dispatch(toggleAxis())}>
          Axis
        </wa-switch>
        <wa-switch checked={showVertices} onChange={() => dispatch(toggleVertices())}>
          Vertices
        </wa-switch>
      </div>
    </footer>
  );
}
