/* eslint-disable */
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { IPrompt, PromptConfig } from '../../interfaces/prompt.interface';

/**
 * Chat prompt that combines:
 *  - a system instruction
 *  - a user (human) input
 *  - a placeholder for previous messages
 *
 * Example Template:
 *   System: "You are a helpful assistant."
 *   Human:  "{input}"
 *   History: {messages}
 */
export class ChatPromptTemplateImpl implements IPrompt<ChatPromptTemplate> {
  create(config: PromptConfig): ChatPromptTemplate {
    // Expect these optional keys in config.templateVariables if provided:
    //  - system: string (system message text)
    //  - human: string (human input template)
    //  - historyKey?: string (placeholder key, default 'messages')
    const { templateVariables } = (config as any) ?? {};
    const systemText =
      templateVariables?.system ??
      'You are a helpful assistant. Answer the user clearly.';
    const humanTemplate =
      templateVariables?.human ??
      '{input}';
    const historyKey = templateVariables?.historyKey ?? 'messages';

    return ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(systemText),
      new MessagesPlaceholder(historyKey),
      HumanMessagePromptTemplate.fromTemplate(humanTemplate),
    ]);
  }
}
