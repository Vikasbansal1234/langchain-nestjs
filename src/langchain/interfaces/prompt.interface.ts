/* eslint-disable */
import { PromptKind } from '../enums/prompt.enums';
/**
 * Unified configuration for all prompt types
 * (supports both simple string templates and chat templates).
 */
export interface PromptConfig {
  /** Unique registry name for discovery */
  name: string;

  /** Prompt type: 'prompt' | 'chat' | 'fewshot' */
  kind: PromptKind;

  /**
   * ⚡️ For simple PromptTemplate (non-chat):
   * The raw string template (e.g. "Translate this: {sentence}")
   * OPTIONAL for chat prompts.
   */
  template?: string;

  /**
   * ⚡️ Chat-specific fields (ignored by non-chat kinds)
   * --------------------------------------------------
   */
  systemTemplate?: string; // System message text
  humanTemplate?: string;  // Human message template
  historyKey?: string;     // Placeholder key for conversation history
}
/**
 * Base prompt interface to be implemented by concrete prompts.
 */
export interface IPrompt<T = any> {
  create(config: PromptConfig): T;
}
