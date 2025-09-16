/* eslint-disable */
import { RunnableLike, RunnableSequence } from '@langchain/core/runnables';
import { ChainConfig } from '../interfaces/chain.interface';
import { ModelFactory } from '../factories/model.factory';
import { PromptFactory } from '../factories/prompt.factory';
import { ParserFactory } from '../factories/parser.factory';

export class ChainFactory {
  static create(config: ChainConfig, deps: Record<string, any>): any {
    const chainName = config.name;  // ✅ capture to avoid "never"

    let prompt: any;
    let model: any;
    let parser: any;

    if ('modelRef' in config && 'promptRef' in config) {
      prompt = deps[config.promptRef];
      model  = deps[config.modelRef];
      parser = config.parserRef ? deps[config.parserRef] : undefined;

      if (!prompt) throw new Error(`Prompt '${config.promptRef}' not found`);
      if (!model)  throw new Error(`Model '${config.modelRef}' not found`);
    }
    else if ('model' in config && 'prompt' in config) {
      prompt = PromptFactory.create(config.prompt);
      model  = ModelFactory.create(config.model);
      parser = config.parser ? ParserFactory.create(config.parser) : undefined;
    }
    else {
      throw new Error(
        `Invalid ChainConfig for '${chainName}'. ` +
        `Provide either (modelRef & promptRef) or (model & prompt).`
      );
    }

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
