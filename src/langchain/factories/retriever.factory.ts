/* eslint-disable */
import { RetrieverKind } from '../enums/retriever.enums';
import { MultiQueryRetrieverImpl } from '../impl/retrievers/multi-query.impl';
import { IRetriever, RetrieverConfig } from '../interfaces/retriever.interface';

const registry: Map<RetrieverKind, IRetriever> = new Map([
  [RetrieverKind.MultiQuery,     new MultiQueryRetrieverImpl()],
]);

export class RetrieverFactory {
  static async create<T>(
    config: RetrieverConfig,
    deps: Record<string, any>,
  ): Promise<T> {
    const impl = registry.get(config.kind);
    if (!impl) {
      throw new Error(`No retriever for kind: ${config.kind}`);
    }
    return (await impl.create(config, deps)) as T;
  }
}
