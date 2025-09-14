/* eslint-disable */
import { PromptKind } from '../enums/prompt.enums';
/**
 * Unified configuration for all prompt types
 * (supports both simple string templates and chat templates).
 */
import { MessagesPlaceholder } from '@langchain/core/prompts';

export interface PromptConfig {
  name: string;
  kind: PromptKind;
  template?: string; // for simple PromptTemplate
  messages?: Array<
    | { role: 'system' | 'human'; template: string }
    | MessagesPlaceholder
  >;
}

/**
 * Base prompt interface to be implemented by concrete prompts.
 */
export interface IPrompt<T = any> {
  create(config: PromptConfig): T;
}
