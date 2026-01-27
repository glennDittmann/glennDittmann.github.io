// Mock Tauri API for web environment
// In a real implementation, these would call backend API endpoints

import type { ClusteringRequest } from "../types/ClusteringRequest";
import type { ClusteringResult2 } from "../types/ClusteringResult2";
import type { SimplificationRequest2 } from "../types/SimplificationRequest2";
import type { SimplificationResult } from "../types/SimplificationResult";
import type { TetrahedralizationResult } from "../types/TetrahedralizationResult";
import type { TriangulationRequest } from "../types/TriangulationRequest";
import type { TriangulationResult } from "../types/TriangulationResult";

/**
 * Mock Tauri invoke function for web environment
 * TODO: Replace with actual API calls to backend service
 */
export async function invoke<T>(
	command: string,
	args?: { request: unknown },
): Promise<T> {
	console.warn(
		`Tauri command "${command}" called in web environment. This is a mock implementation.`,
	);

	// Mock implementations - return empty results for now
	// In production, these should call actual backend API endpoints
	switch (command) {
		case "triangulate": {
			const request = args?.request as TriangulationRequest;
			return {
				triangles: [],
				vertices: request?.vertices || [],
			} as T;
		}
		case "tetrahedralize": {
			const request = args?.request as TriangulationRequest;
			return {
				tetrahedra: [],
				vertices: request?.vertices || [],
			} as T;
		}
		case "cluster2d": {
			return {
				clusters: [],
			} as T;
		}
		case "simplify2d": {
			return {
				simplified_vertices: [],
			} as T;
		}
		default:
			throw new Error(`Unknown command: ${command}`);
	}
}
