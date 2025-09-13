/* eslint-disable */

/**
 * Supported vector store backends.
 */
export enum VectorStoreKind {
  Redis    = 'redis',
  PGVector = 'pgvector',
  MongoDB  = 'mongodb',
  Neo4j    = 'neo4j',
}
