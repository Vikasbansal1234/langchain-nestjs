export enum Provider {
  OpenAI = 'openai',
  Azure = 'azure',
  Ollama = 'ollama',
  Groq = 'groq',
  Anthropic = 'anthropic',
}

export enum ModelKind {
  Chat = 'chat',
  Completion = 'completion',
  Embeddings = 'embeddings',
}

export enum PromptKind {
  String = 'string',
  Chat = 'chat',
}

export enum ParserKind {
  Structured = 'structured',
}
