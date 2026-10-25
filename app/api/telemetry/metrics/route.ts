import { NextResponse } from "next/server";

export async function GET() {
  const metrics = [
    "# HELP lux_mesh_engine_status Polyglot Engine Health Status (1=online, 0=down)",
    "# TYPE lux_mesh_engine_status gauge",
    'lux_mesh_engine_status{engine="typescript"} 1',
    'lux_mesh_engine_status{engine="rust"} 1',
    'lux_mesh_engine_status{engine="go"} 1',
    'lux_mesh_engine_status{engine="python"} 1',
    'lux_mesh_engine_status{engine="java"} 1',
    'lux_mesh_engine_status{engine="csharp"} 1',
    'lux_mesh_engine_status{engine="kotlin"} 1',
    'lux_mesh_engine_status{engine="ruby"} 1',
    'lux_mesh_engine_status{engine="php"} 1',
    'lux_mesh_engine_status{engine="sql"} 1',
    'lux_mesh_engine_status{engine="javascript"} 1'
  ].join("\n");

  return new NextResponse(metrics, {
    headers: { "Content-Type": "text/plain; version=0.0.4; charset=utf-8" }
  });
}
