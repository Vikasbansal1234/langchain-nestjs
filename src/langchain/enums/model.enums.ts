/* eslint-disable */

/**
 * Providers supported by the Model system.
 */
export enum Provider {
  OpenAI = 'openai',
  Azure  = 'azure',
  Groq   = 'groq',
  Ollama = 'ollama',
}

/**
 * Kinds of models supported.
 */
export enum ModelKind {
  Chat       = 'chat',
  Completion = 'completion',
  Embeddings = 'embeddings',
}
