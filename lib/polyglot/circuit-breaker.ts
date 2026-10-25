export interface CircuitBreakerOptions {
  failureThreshold: number;
  resetTimeoutMs: number;
}

export class ServiceCircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: "CLOSED" | "OPEN" | "HALF_OPEN" = "CLOSED";

  constructor(
    private readonly serviceName: string,
    private readonly options: CircuitBreakerOptions = { failureThreshold: 3, resetTimeoutMs: 10000 }
  ) {}

  public async execute<T>(action: () => Promise<T>): Promise<T> {
    if (this.state === "OPEN") {
      const now = Date.now();
      if (now - this.lastFailureTime > this.options.resetTimeoutMs) {
        this.state = "HALF_OPEN";
      } else {
        throw new Error(`Circuit for service '${this.serviceName}' is OPEN. Request rejected.`);
      }
    }

    try {
      const result = await action();
      this.reset();
      return result;
    } catch (err) {
      this.recordFailure();
      throw err;
    }
  }

  private recordFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.options.failureThreshold) {
      this.state = "OPEN";
    }
  }

  private reset(): void {
    this.failures = 0;
    this.state = "CLOSED";
  }

  public getState(): "CLOSED" | "OPEN" | "HALF_OPEN" {
    return this.state;
  }
}
