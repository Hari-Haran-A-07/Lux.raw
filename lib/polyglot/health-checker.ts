import { PolyglotMasterOrchestrator } from "./orchestrator";

export interface MeshHealthReport {
  overallStatus: "HEALTHY" | "DEGRADED" | "DOWN";
  activeEngines: number;
  totalEngines: number;
  averageLatencyMs: number;
  checkedAt: string;
}

export async function aggregateMeshHealth(): Promise<MeshHealthReport> {
  const orchestrator = PolyglotMasterOrchestrator.getInstance();
  const engines = await orchestrator.getEngineRegistry();

  const active = engines.filter(e => e.status === "ONLINE" || e.status === "HEALTHY");
  const avgLatency = engines.reduce((acc, e) => acc + e.latencyMs, 0) / (engines.length || 1);

  return {
    overallStatus: active.length === engines.length ? "HEALTHY" : "DEGRADED",
    activeEngines: active.length,
    totalEngines: engines.length,
    averageLatencyMs: Math.round(avgLatency * 10) / 10,
    checkedAt: new Date().toISOString()
  };
}
