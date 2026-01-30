import type { Cluster2 } from "../features/triangulator/types/Cluster2";
import type { Vertex3 } from "../features/triangulator/types/Vertex3";

/** WASM bounds use (x, y); we use (x, z) for 2D with y=0 */
function wasmVertex2ToVertex3(v: { x: number; y: number; }): Vertex3 {
	return { x: v.x, y: 0, z: v.y };
}

/** Convert WASM cluster2 array to Cluster2[] */
export function wasmClusters2ToCluster2(wasmClusters: Array<{
	id: string;
	bounds: { bottom_left: any; bottom_right: any; top_right: any; top_left: any };
	vertices: Array<{ x: number; y: number; z: number }>;
}>): Cluster2[] {
	return wasmClusters.map((c) => ({
		id: c.id,
		bounds: {
			bottom_left: wasmVertex2ToVertex3(c.bounds.bottom_left),
			bottom_right: wasmVertex2ToVertex3(c.bounds.bottom_right),
			top_right: wasmVertex2ToVertex3(c.bounds.top_right),
			top_left: wasmVertex2ToVertex3(c.bounds.top_left),
		},
		vertices: c.vertices.map((v) => wasmVertex2ToVertex3(v)),
	}));
}

/** Convert flat [x1, y1, x2, y2, ...] from WASM to Vertex3[] (2D: x, z from flat, y=0) */
export function wasmFlat2DToVertex3(flat: number[]): Vertex3[] {
	const out: Vertex3[] = [];
	for (let i = 0; i < flat.length; i += 2) {
		out.push({ x: flat[i], y: 0, z: flat[i + 1] });
	}
	return out;
}