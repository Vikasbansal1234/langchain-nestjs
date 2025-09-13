/* eslint-disable */

import { PromptTemplate } from '@langchain/core/prompts';
import { IPrompt, PromptConfig } from '../../interfaces/prompt.interface';
import { Prompt } from '@nestjs-mcp/server';

/**
 * Basic string template prompt.
 */
export class PromptTemplateImpl implements IPrompt<PromptTemplate> {
  create(config: PromptConfig): PromptTemplate {
    return PromptTemplate.fromTemplate(config.template||"");
  }
}
