/* eslint-disable */
import { VectorStoreKind } from '../enums/vector.enums';
import { IVectorStore, VectorStoreConfig } from '../interfaces/vector.interface';
import { RedisVectorStoreImpl } from '../impl/vectorstores/redis-vector.impl';

// Register available vector store implementations
const registry: Map<VectorStoreKind, IVectorStore> = new Map([
  [VectorStoreKind.Redis, new RedisVectorStoreImpl()],
]);

export class VectorStoreFactory {

  static async create<T>(
    config: VectorStoreConfig,
    deps: Record<string, any>
  ): Promise<T> {
    const impl = registry.get(config.kind);
    if (!impl) {
      throw new Error(`No vector store found for kind: ${config.kind}`);
    }
    return impl.create(config, deps);
  }
}
