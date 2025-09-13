/* eslint-disable */

import { PromptTemplate } from '@langchain/core/prompts';
import { IPrompt, PromptConfig } from '../../interfaces/prompt.interface';

/**
 * Basic string template prompt.
 */
export class PromptTemplateImpl implements IPrompt<PromptTemplate> {
  create(config: PromptConfig): PromptTemplate {
    return new PromptTemplate({
      template: config.template,
      inputVariables: config.inputVariables,
    });
  }
}
