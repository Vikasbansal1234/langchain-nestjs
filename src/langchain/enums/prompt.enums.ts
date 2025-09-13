/* eslint-disable */

/**
 * Supported prompt template kinds.
 * Used by factories and decorators to resolve implementation.
 */
export enum PromptKind {
  PromptTemplate     = 'prompt',
  ChatPromptTemplate = 'chat',        // ✅ for chat style prompts
  FewShotChatPrompt  = 'fewshot',
}