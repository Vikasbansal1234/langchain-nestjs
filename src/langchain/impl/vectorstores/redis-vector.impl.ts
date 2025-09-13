/* eslint-disable */
import { RedisVectorStore } from '@langchain/redis';
import { IVectorStore, VectorStoreConfig } from '../../interfaces/vector.interface';
import { createClient } from 'redis';

/**
 * Redis VectorStore wrapper.
 * Establishes a Redis connection and returns a configured RedisVectorStore.
 */
export class RedisVectorStoreImpl implements IVectorStore<RedisVectorStore> {
  async create(
    config: VectorStoreConfig,
    deps: Record<string, any>
  ): Promise<RedisVectorStore> {
    // Option A: use a pre-supplied redis client from deps
    let redisClient = deps[config.clientRef || 'redis'];

    // Option B: if none provided, create a temporary connection
    if (!redisClient) {
      redisClient = createClient({ url: 'redis://localhost:6379' });
      await redisClient.connect();
    }

    const embeddings = deps[config.embeddingsRef];
    if (!embeddings) {
      throw new Error(
        `Embeddings instance '${config.embeddingsRef}' not found in dependencies`
      );
    }

    return new RedisVectorStore(embeddings, {
      redisClient,
      indexName: config.indexName,
    });
  }
}
