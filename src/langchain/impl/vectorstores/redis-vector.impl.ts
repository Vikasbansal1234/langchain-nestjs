/* eslint-disable */
import { RedisVectorStore } from '@langchain/redis';
import { IVectorStore, VectorStoreConfig } from '../../interfaces/vector.interface';

/**
 * Redis vector store wrapper.
 */
export class RedisVectorStoreImpl implements IVectorStore<RedisVectorStore> {
  create(config: VectorStoreConfig, deps: Record<string, any>): RedisVectorStore {
    const embeddings = deps[config.embeddingsRef];
    const redisClient = deps[config.clientRef || 'redis'];
    return new RedisVectorStore(embeddings, {
      redisClient,
      indexName: config.indexName,
    });
  }
}
