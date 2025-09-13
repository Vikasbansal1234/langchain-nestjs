/* eslint-disable */
import { RetrieverKind } from '../enums/retriever.enums';

/**
 * Configuration for a retriever.
 */
export interface RetrieverConfig {
  name: string;               // Unique registry key
  kind: RetrieverKind;        // Retriever strategy
  vectorStoreRef: string;     // Property name of vector store instance
  llmRef?: string;            // Optional model reference
  promptRef?: string;         // Optional prompt reference
  parserRef?: string;         // Optional parser reference
  config?: Record<string, any>; // Additional implementation options
}

/**
 * Interface implemented by all retriever wrappers.
 */
export interface IRetriever<T = any> {
  create(config: RetrieverConfig, deps: Record<string, any>): T | Promise<T>;
}
