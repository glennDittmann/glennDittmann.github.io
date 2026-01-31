// Tauri API replacement for web environment using WASM
// Uses WebAssembly for clustering operations

import type { ClusteringRequest } from "../types/ClusteringRequest";
import type { ClusteringResult2 } from "../types/ClusteringResult2";
import type { Cluster2 } from "../types/Cluster2";
import type { Vertex3 } from "../types/Vertex3";
import type { SimplificationRequest2 } from "../types/SimplificationRequest2";
import type { SimplificationResult } from "../types/SimplificationResult";
import type { TetrahedralizationResult } from "../types/TetrahedralizationResult";
import type { TriangulationRequest } from "../types/TriangulationRequest";
import type { TriangulationResult } from "../types/TriangulationResult";
import init, { VertexClusterer2D } from "vertex_clustering";
import { wasmClusters2ToCluster2, wasmFlat2DToVertex3 } from "../../../helper/wasm";

// Lazy init: only run in browser, only when first needed (avoids SSR fetch failure)
let wasmReady: Promise<void> | null = null;

/** Current 2D clusterer instance; simplify2d uses this. */
let currentClusterer2D: InstanceType<typeof VertexClusterer2D> | null = null;

export async function ensureWasm(): Promise<void> {
	if (typeof window === "undefined") {
		throw new Error("WASM can only run in the browser");
	}
	if (!wasmReady) {
		wasmReady = init().then(() => undefined);
	}
	await wasmReady;
}

/**
 * Tauri invoke function replacement for web environment
 * Uses WASM for clustering operations, mocks other operations
 */
export async function invoke<T>(
	command: string,
	args?: { request: unknown },
): Promise<T> {
	switch (command) {
		case "triangulate": {
			// TODO: Implement triangulation in WASM or via API
			const request = args?.request as TriangulationRequest;
			console.warn(
				"Triangulation not yet implemented in WASM. Returning empty result.",
			);
			return {
				triangles: [],
				vertices: request?.vertices || [],
			} as T;
		}
		case "tetrahedralize": {
			// TODO: Implement tetrahedralization in WASM or via API
			const request = args?.request as TriangulationRequest;
			console.warn(
				"Tetrahedralization not yet implemented in WASM. Returning empty result.",
			);
			return {
				tetrahedra: [],
				vertices: request?.vertices || [],
			} as T;
		}
		case "cluster2d": {
			const request = args?.request as ClusteringRequest;
			try {
				await ensureWasm();
				const flat = new Float64Array(
					request.vertices.flatMap((v) => [v.x, v.z]),
				);
				const clusterer = new VertexClusterer2D(flat, request.grid_size);
				currentClusterer2D = clusterer;
				const rawClusters = clusterer.compute_clusters();
				
				const clusters = wasmClusters2ToCluster2(rawClusters);

				return { clusters } as T;
			} catch (error) {
				console.error("WASM clustering failed:", error);
				throw new Error(
					`Clustering failed: ${error instanceof Error ? error.message : String(error)}`,
				);
			}
		}
		case "simplify2d": {
			try {
				if (!currentClusterer2D) {
					throw new Error(
						"simplify2d requires an existing clusterer; run cluster2d first",
					);
				}
				const flat = currentClusterer2D.simplify() as number[];
				const simplified_vertices = wasmFlat2DToVertex3(flat);
				
				return { simplified_vertices } as T;
			} catch (error) {
				console.error("WASM simplification failed:", error);
				throw new Error(
					`Simplification failed: ${error instanceof Error ? error.message : String(error)}`,
				);
			}
		}
		default:
			throw new Error(`Unknown command: ${command}`);
	}
}
