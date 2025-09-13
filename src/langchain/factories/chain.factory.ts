/* eslint-disable */
import { RunnableLike, RunnableSequence } from '@langchain/core/runnables';
import { ChainConfig } from '../interfaces/chain.interface';

export class ChainFactory {
  static create(config: ChainConfig, deps: Record<string, any>): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const prompt = deps[config.promptRef];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const model = deps[config.modelRef];
    const parser = config.parserRef ? deps[config.parserRef] : undefined;

    if (!prompt) throw new Error(`Prompt '${config.promptRef}' not found`);
    if (!model) throw new Error(`Model '${config.modelRef}' not found`);

    const baseSteps = [prompt, model] as [
      RunnableLike<any, any>,
      RunnableLike<any, any>
    ];
    const steps = parser
      ? ([...baseSteps, parser] as [
          RunnableLike<any, any>,
          ...RunnableLike<any, any>[],
          RunnableLike<any, any>
        ])
      : baseSteps;

    return RunnableSequence.from(steps);
  }
}
