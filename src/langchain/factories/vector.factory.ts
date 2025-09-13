/* eslint-disable */
import { VectorStoreKind } from '../enums/vector.enums';
import { RedisVectorStoreImpl } from '../impl/vectorstores/redis-vector.impl';
import { IVectorStore, VectorStoreConfig } from '../interfaces/vector.interface';
// Add PGVectorVectorImpl, MongoDBVectorImpl, etc.

const registry: Map<VectorStoreKind, IVectorStore> = new Map([
  [VectorStoreKind.Redis, new RedisVectorStoreImpl()],
]);

export class VectorStoreFactory {
  static create<T>(
    config: VectorStoreConfig,
    deps: Record<string, any>,
  ): T {
    const impl = registry.get(config.kind);
    if (!impl) {
      throw new Error(`No vector store for kind: ${config.kind}`);
    }
    return impl.create(config, deps) as T;
  }
}
