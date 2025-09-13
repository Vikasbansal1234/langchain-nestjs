/* eslint-disable */
import { VectorStoreKind } from '../enums/vector.enums';

/**
 * Configuration for a vector store.
 */
export interface VectorStoreConfig {
  name: string;          // Unique registry key
  kind: VectorStoreKind; // Vector store backend
  indexName: string;     // Index/collection name
  embeddingsRef: string; // Property name of embeddings instance
  clientRef?: string;    // Optional client (e.g. Redis client)
  dbName?: string;
  collectionName?: string;
}

/**
 * Interface implemented by all vector store wrappers.
 */
export interface IVectorStore<T = any> {
  create(config: VectorStoreConfig, deps: Record<string, any>): T;
}
