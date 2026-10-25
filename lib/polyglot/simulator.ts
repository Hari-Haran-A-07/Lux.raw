export interface MockSimulationResult<T> {
  serviceId: string;
  simulatedLatencyMs: number;
  data: T;
  isMock: true;
}

export async function simulatePolyglotService<T>(
  serviceId: string,
  mockPayload: T,
  delayMs = 15
): Promise<MockSimulationResult<T>> {
  await new Promise(resolve => setTimeout(resolve, delayMs));
  return {
    serviceId,
    simulatedLatencyMs: delayMs,
    data: mockPayload,
    isMock: true
  };
}
