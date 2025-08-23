import { ChainConfig, IChain } from '../interfaces/chain.interface';

// Implementations
import { RunnableSequenceChainImpl } from '../implementations/chains/runnable-sequence-chain.impl';

export class ChainFactory {
  // For chains, we use a single default implementation since ChainConfig doesn't have a 'kind' field
  private static readonly defaultChainImpl = new RunnableSequenceChainImpl();

  static create<T>(config: ChainConfig, instance: any): T {
    return ChainFactory.defaultChainImpl.create(config, instance) as T;
  }
}
