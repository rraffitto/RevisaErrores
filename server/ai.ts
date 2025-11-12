/**
 * Central helper to manage AI model selection and calls.
 *
 * Currently this contains a small abstraction so we can change the
 * model name via `process.env.MODEL_NAME` and later implement the
 * real provider integration (Anthropic/OpenAI) here.
 */

export function getModelName(): string {
  return process.env.MODEL_NAME || "claude-haiku-4.5";
}

export async function callModel(prompt: string, options?: { model?: string }) {
  // Stub: implement provider integration here. For now, return a fake response
  const model = options?.model || getModelName();

  // In a real implementation you'd call the provider API with credentials,
  // e.g. using fetch or an SDK and pass `model`.
  return {
    model,
    text: `Simulated response for model ${model}: ${prompt.slice(0, 200)}`,
  };
}
