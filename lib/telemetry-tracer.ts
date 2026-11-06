export interface TelemetrySpan {
  traceId: string;
  spanName: string;
  startTime: number;
  durationMs?: number;
  attributes: Record<string, string | number | boolean>;
}

export class MaisonTracer {
  private spans: TelemetrySpan[] = [];
  private static instance: MaisonTracer;

  private constructor() {}

  public static getInstance(): MaisonTracer {
    if (!MaisonTracer.instance) {
      MaisonTracer.instance = new MaisonTracer();
    }
    return MaisonTracer.instance;
  }

  public startSpan(spanName: string, attributes: Record<string, string | number | boolean> = {}): { end: () => TelemetrySpan } {
    const traceId = `trc_${Math.random().toString(36).substring(2, 11)}`;
    const startTime = performance.now();

    return {
      end: () => {
        const durationMs = Math.round((performance.now() - startTime) * 100) / 100;
        const span: TelemetrySpan = {
          traceId,
          spanName,
          startTime,
          durationMs,
          attributes: {
            ...attributes,
            timestamp: new Date().toISOString(),
          },
        };
        this.spans.push(span);
        if (this.spans.length > 200) {
          this.spans.shift(); // retain fixed buffer
        }
        return span;
      },
    };
  }

  public getRecentSpans(): TelemetrySpan[] {
    return [...this.spans];
  }

  public getAverageLatency(spanName: string): number {
    const matched = this.spans.filter((s) => s.spanName === spanName && s.durationMs !== undefined);
    if (matched.length === 0) return 0;
    const total = matched.reduce((acc, s) => acc + (s.durationMs || 0), 0);
    return Math.round((total / matched.length) * 100) / 100;
  }
}

export const maisonTracer = MaisonTracer.getInstance();
