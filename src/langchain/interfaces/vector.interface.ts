/* eslint-disable */
import { VectorStoreKind } from '../enums/vector.enums';

/**
 * Configuration passed to a VectorStore implementation.
 */
export interface VectorStoreConfig {
  name: string;               // Registry key
  kind: VectorStoreKind;      // e.g. Redis, PGVector, etc.
  indexName: string;          // Name of the index/collection
  embeddingsRef: string;      // Property name of the embeddings instance
  clientRef?: string;         // Optional reference to a redis/pg client
  dbName?: string;
  collectionName?: string;
}

/**
 * Contract for all vector store implementations.
 * NOTE: create is now async to allow network connections.
 */
export interface IVectorStore<T = any> {
  create(config: VectorStoreConfig, deps: Record<string, any>): Promise<T>;
}
