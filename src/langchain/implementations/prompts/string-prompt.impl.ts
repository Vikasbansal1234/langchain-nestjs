import { PromptTemplate } from '@langchain/core/prompts';
import { IPrompt, PromptConfig } from '../../interfaces/prompt.interface';

export class StringPromptImpl implements IPrompt<PromptTemplate> {
  create(config: PromptConfig): PromptTemplate {
    return PromptTemplate.fromTemplate(config.template);
  }
}
