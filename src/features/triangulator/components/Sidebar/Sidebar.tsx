import type WaRadioGroup from "@awesome.me/webawesome/dist/components/radio-group/radio-group.js";
import type WaSlider from "@awesome.me/webawesome/dist/components/slider/slider.js";
import type WaToast from "@awesome.me/webawesome/dist/components/toast/toast.js";
import { useRef, useState } from "react";
import type { ClusteringRequest } from "../../types/ClusteringRequest";
import type { ClusteringResult2 } from "../../types/ClusteringResult2";
import type { SimplificationRequest2 } from "../../types/SimplificationRequest2";
import type { SimplificationResult } from "../../types/SimplificationResult";
import type { TetrahedralizationResult } from "../../types/TetrahedralizationResult";
import type { TriangulationRequest } from "../../types/TriangulationRequest";
import type { TriangulationResult } from "../../types/TriangulationResult";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Sidebar.css";
import type { Dimension } from "../../types/Dimension";
import type { Triangle3 } from "../../types/Triangle3";
import type { Vertex3 } from "../../types/Vertex3";
import {
  resetClusteringWorkflow,
  selectClusters,
  selectGridSize,
  selectIsClusteringComplete,
  selectIsSimplificationComplete,
  selectIsVertexClusteringMethod,
  selectSimplifiedVertices,
  selectTriangulationMethod,
  setClusteringResults,
  setGridSize,
  setSimplificationResults,
  setTriangulationMethod,
  TriangulationMethod,
} from "../../store/features/clustering/clusteringSlice";
import {
  clearLiftedTriangles,
  setLiftedTriangles,
} from "../../store/features/liftedTriangles/liftedTrianglesSlice";
import {
  clearLiftedVertices,
  setLiftedVertices,
} from "../../store/features/liftedVertices/liftedVerticesSlice";
import {
  resetSimplifiedVertices,
  selectEpsilon,
  setDimension,
  setEpsilon,
  setSimplifiedVertices,
  setTetrahedra,
  setTriangles,
  setVertices,
} from "../../store/features/vertexSettings/vertexSettingsSlice";
import { invoke } from "../../utils/tauriMock";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const dimension = useAppSelector((state) => state.vertexSettings.dimension);
  const gridSize = useAppSelector(selectGridSize);
  const epsilon = useAppSelector(selectEpsilon);
  const vertices = useAppSelector((state) => state.vertexSettings.vertices);
  const triangles = useAppSelector((state) => state.vertexSettings.triangles);
  const triangulationMethod = useAppSelector(selectTriangulationMethod);
  const isVertexClustering = useAppSelector(selectIsVertexClusteringMethod);
  const clusters = useAppSelector(selectClusters);
  const isClusteringComplete = useAppSelector(selectIsClusteringComplete);
  const isSimplificationComplete = useAppSelector(selectIsSimplificationComplete);
  const simplifiedVertices = useAppSelector(selectSimplifiedVertices);
  const [numVertices, setNumVertices] = useState(4);
  const toast = useRef<WaToast | null>(null);

  function showNotification(
    title: string,
    message: string,
    variant: "danger" | "success" = "success",
  ) {
    void toast.current?.create(`${title}: ${message}`, { variant });
  }

  async function triangulate() {
    const triangulationResult = await invoke<TriangulationResult>("triangulate", {
      request: { vertices, epsilon } as TriangulationRequest,
    });

    dispatch(setTriangles(triangulationResult.triangles));
    dispatch(clearLiftedTriangles());

    showNotification(
      "Triangulation Complete",
      `${triangulationResult.triangles.length} triangles created`,
    );
  }

  async function tetrahedralize() {
    const tetrahedralizationResult = await invoke<TetrahedralizationResult>("tetrahedralize", {
      request: { vertices, epsilon } as TriangulationRequest,
    });

    dispatch(setTetrahedra(tetrahedralizationResult.tetrahedra));
    dispatch(clearLiftedTriangles());

    showNotification(
      "Tetrahedralization Complete",
      `${tetrahedralizationResult.tetrahedra.length} tetrahedra created`,
    );
  }

  const handleCreateVertices = () => {
    const vertices: Vertex3[] = Array.from({ length: numVertices })
      .fill(0)
      .map(() => ({
        x: (Math.random() - 0.5) * 5,
        y: dimension === "TWO" ? 0 : (Math.random() - 0.5) * 5,
        z: (Math.random() - 0.5) * 5,
      }));
    dispatch(setVertices(vertices));
    dispatch(resetSimplifiedVertices());
    dispatch(setTriangles([]));
    dispatch(setTetrahedra([]));
    dispatch(clearLiftedVertices());
    dispatch(clearLiftedTriangles());
    dispatch(resetClusteringWorkflow());
  };

  const handleLift = () => {
    if (dimension === "TWO" && vertices.length > 0) {
      const liftedVertices: Vertex3[] = vertices.map((vertex: Vertex3) => ({
        x: vertex.x,
        y: vertex.x * vertex.x + vertex.z * vertex.z,
        z: vertex.z,
      }));
      dispatch(setLiftedVertices(liftedVertices));
    }
  };

  const handleLiftTriangles = () => {
    if (dimension === "TWO" && triangles.length > 0) {
      const liftedTriangles: Triangle3[] = triangles.map((triangle: Triangle3) => ({
        id: `lifted-${triangle.id}`,
        a: {
          x: triangle.a.x,
          y: triangle.a.x * triangle.a.x + triangle.a.z * triangle.a.z,
          z: triangle.a.z,
        },
        b: {
          x: triangle.b.x,
          y: triangle.b.x * triangle.b.x + triangle.b.z * triangle.b.z,
          z: triangle.b.z,
        },
        c: {
          x: triangle.c.x,
          y: triangle.c.x * triangle.c.x + triangle.c.z * triangle.c.z,
          z: triangle.c.z,
        },
      }));
      dispatch(setLiftedTriangles(liftedTriangles));
    }
  };

  function handleDimensionChange(value: string) {
    const newMode = value as Dimension;
    if (newMode === "TWO") {
      dispatch(setDimension("TWO"));
    } else if (newMode === "THREE") {
      dispatch(setDimension("THREE"));
      dispatch(clearLiftedVertices());
      dispatch(clearLiftedTriangles());
    }
  }

  function handleMethodChange(value: string) {
    const newMethod = value as TriangulationMethod;
    dispatch(setTriangulationMethod(newMethod));
  }

  const handleTriangulate = async () => {
    if (dimension === "TWO") {
      await triangulate();
    } else if (dimension === "THREE") {
      await tetrahedralize();
    }
  };

  // Vertex clustering workflow functions
  async function handleCluster() {
    try {
      const clusteringResult = await invoke<ClusteringResult2>("cluster2d", {
        request: {
          vertices,
          grid_size: gridSize,
        } as ClusteringRequest,
      });

      dispatch(
        setClusteringResults({
          clusters: clusteringResult.clusters,
        }),
      );

      showNotification(
        "Clustering Complete",
        `${clusteringResult.clusters.length} clusters created`,
      );
    } catch (error) {
      console.error("Clustering failed:", error);
      showNotification("Clustering Failed", "An error occurred during clustering", "danger");
    }
  }

  async function handleSimplify() {
    try {
      const simplificationResult = await invoke<SimplificationResult>("simplify2d", {
        request: {
          clusters,
        } as SimplificationRequest2,
      });

      dispatch(
        setSimplificationResults({
          simplifiedVertices: simplificationResult.simplified_vertices,
        }),
      );

      dispatch(setSimplifiedVertices(simplificationResult.simplified_vertices));

      showNotification(
        "Simplification Complete",
        `${simplificationResult.simplified_vertices.length} representative vertices created`,
      );
    } catch (error) {
      console.error("Simplification failed:", error);
      showNotification(
        "Simplification Failed",
        "An error occurred during simplification",
        "danger",
      );
    }
  }

  async function handleClusteringTriangulate() {
    try {
      const triangulationResult = await invoke<TriangulationResult>("triangulate", {
        request: {
          vertices: simplifiedVertices,
          epsilon: 0.0,
        } as TriangulationRequest,
      });

      dispatch(setTriangles(triangulationResult.triangles));
      dispatch(clearLiftedTriangles());

      showNotification(
        "Triangulation Complete",
        `${triangulationResult.triangles.length} triangles created from clustered vertices`,
      );
    } catch (error) {
      console.error("Clustering triangulation failed:", error);
      showNotification("Triangulation Failed", "An error occurred during triangulation", "danger");
    }
  }

  const minNumVertices = dimension === "TWO" ? 3 : 4;
  const maxNumVertices = 100;
  const is3DDisabledForClustering = isVertexClustering && dimension === "THREE";

  return (
    <aside className="sidebar wa-stack wa-gap-l" aria-label="Triangulation controls">
      <wa-toast
        ref={(element) => {
          toast.current = element;
        }}
      ></wa-toast>

      <div className="sidebar-section wa-stack wa-gap-m">
        <wa-radio-group
          className="segmented-control"
          label="Dimension"
          orientation="horizontal"
          value={dimension}
          onChange={(event) => {
            handleDimensionChange(String((event.currentTarget as WaRadioGroup).value));
          }}
        >
          <wa-radio appearance="button" value="TWO">
            2D
          </wa-radio>
          <wa-radio appearance="button" value="THREE">
            3D
          </wa-radio>
        </wa-radio-group>
        {is3DDisabledForClustering && (
          <wa-callout variant="warning" size="s">
            3D mode is not supported for vertex clustering
          </wa-callout>
        )}
      </div>

      <div className="sidebar-section wa-stack wa-gap-m">
        <wa-radio-group
          className="segmented-control"
          label="Triangulation method"
          orientation="horizontal"
          value={triangulationMethod}
          onChange={(event) => {
            handleMethodChange(String((event.currentTarget as WaRadioGroup).value));
          }}
        >
          <wa-radio appearance="button" value={TriangulationMethod.ECIRCLES}>
            e-Circles
          </wa-radio>
          <wa-radio appearance="button" value={TriangulationMethod.VERTEX_CLUSTERING}>
            Vertex Clustering
          </wa-radio>
        </wa-radio-group>
      </div>

      {!is3DDisabledForClustering && (
        <>
          <div className="sidebar-section wa-stack wa-gap-m">
            <div className="slider-container wa-stack wa-gap-xs">
              <wa-slider
                label="Vertices"
                value={numVertices}
                onInput={(event) => setNumVertices((event.currentTarget as WaSlider).value)}
                min={minNumVertices}
                max={maxNumVertices}
                withTooltip
              >
                <span slot="reference">{minNumVertices}</span>
                <span slot="reference">50</span>
                <span slot="reference">{maxNumVertices}</span>
              </wa-slider>
              <div className="slider-value wa-caption-m">{numVertices} vertices</div>
            </div>
            <wa-button className="full-width-control" onClick={handleCreateVertices}>
              Create Vertices
            </wa-button>
          </div>

          {triangulationMethod === TriangulationMethod.ECIRCLES && (
            <>
              {dimension === "TWO" && (
                <div className="sidebar-section wa-stack wa-gap-m">
                  <wa-button
                    className="full-width-control"
                    appearance="filled"
                    onClick={handleLift}
                    disabled={vertices.length === 0}
                  >
                    Lift Vertices
                  </wa-button>
                </div>
              )}
              <div className="sidebar-section wa-stack wa-gap-m">
                <h3>Triangulation</h3>
                <div className="slider-container wa-stack wa-gap-xs">
                  <wa-slider
                    label="Epsilon"
                    value={epsilon}
                    onInput={(event) =>
                      dispatch(setEpsilon((event.currentTarget as WaSlider).value))
                    }
                    min={0.0}
                    max={1.0}
                    step={0.01}
                    withTooltip
                  >
                    <span slot="reference">0.0</span>
                    <span slot="reference">0.5</span>
                    <span slot="reference">1.0</span>
                  </wa-slider>
                  <div className="slider-value wa-caption-m">Epsilon: {epsilon.toFixed(2)}</div>
                </div>
                <wa-button
                  className="full-width-control"
                  variant="brand"
                  onClick={handleTriangulate}
                  disabled={vertices.length < 3}
                >
                  Triangulate
                </wa-button>
              </div>
              {dimension === "TWO" && (
                <div className="sidebar-section wa-stack wa-gap-m">
                  <wa-button
                    className="full-width-control"
                    appearance="filled"
                    onClick={handleLiftTriangles}
                    disabled={triangles.length === 0}
                  >
                    Lift Triangles
                  </wa-button>
                </div>
              )}
            </>
          )}

          {triangulationMethod === TriangulationMethod.VERTEX_CLUSTERING && (
            <div className="sidebar-section wa-stack wa-gap-m">
              <h3>Vertex Clustering Workflow</h3>
              <div className="slider-container wa-stack wa-gap-xs">
                <wa-slider
                  label="Grid size"
                  value={gridSize}
                  onInput={(event) =>
                    dispatch(setGridSize((event.currentTarget as WaSlider).value))
                  }
                  min={0.1}
                  max={10}
                  step={0.1}
                  withTooltip
                >
                  <span slot="reference">0.1</span>
                  <span slot="reference">5</span>
                  <span slot="reference">10</span>
                </wa-slider>
                <div className="slider-value wa-caption-m">Grid Size: {gridSize}</div>
              </div>
              <wa-button
                className="full-width-control"
                appearance="filled"
                onClick={handleCluster}
                disabled={vertices.length < 3 || isClusteringComplete}
              >
                Cluster
              </wa-button>
              <wa-button
                className="full-width-control"
                appearance="filled"
                onClick={handleSimplify}
                disabled={!isClusteringComplete || isSimplificationComplete}
              >
                Simplify
              </wa-button>
              <wa-button
                className="full-width-control"
                variant="brand"
                onClick={handleClusteringTriangulate}
                disabled={!isSimplificationComplete}
              >
                Triangulate
              </wa-button>
            </div>
          )}
        </>
      )}
    </aside>
  );
}
