/* eslint-disable */
import { Provider, ModelKind } from '../enums/model.enums';

/**
 * Configuration for a model provider.
 */
export interface ModelConfig {
  name: string;       // Unique registry key
  provider: Provider; // e.g. openai, azure, groq
  kind: ModelKind;    // chat / completion / embeddings
  model: string;      // model name (e.g. gpt-4)
  temperature?: number;
  apiKey?: string;
  apiVersion?: string;
  baseUrl?: string;
  deploymentName?: string;
  instanceName?: string;
}

/**
 * Interface implemented by all model wrappers.
 */
export interface IModel<T = any> {
  create(config: ModelConfig): T;
}
