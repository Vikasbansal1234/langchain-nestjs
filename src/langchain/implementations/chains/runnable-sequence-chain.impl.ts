import { RunnableSequence } from '@langchain/core/runnables';
import { IChain, ChainConfig } from '../../interfaces/chain.interface';

export class RunnableSequenceChainImpl implements IChain<RunnableSequence> {
  create(config: ChainConfig, instance: any): RunnableSequence {
    const { modelKey, promptKey, parserKey } = config;
    const model = instance[modelKey];
    const prompt = instance[promptKey];
    const parser = instance[parserKey];

    if (!model || !prompt || !parser) {
      throw new Error(`Missing model, prompt, or parser in class for keys: ${modelKey}, ${promptKey}, ${parserKey}`);
    }

    return RunnableSequence.from([
      prompt,
      model,
      parser,
    ]);
  }
}
