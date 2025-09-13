/* eslint-disable */
import { PromptKind } from '../enums/prompt.enums';

/**
 * Configuration for a prompt template.
 */
export interface PromptConfig {
  name: string;             // Unique registry key
  kind: PromptKind;         // Prompt type
  template: string;         // Template text
  inputVariables: string[]; // Variables to interpolate
}

/**
 * Base prompt interface to be implemented by concrete prompts.
 */
export interface IPrompt<T = any> {
  create(config: PromptConfig): T;
}
