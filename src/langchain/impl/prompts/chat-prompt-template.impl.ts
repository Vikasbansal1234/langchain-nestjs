/* eslint-disable */
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { IPrompt, PromptConfig } from '../../interfaces/prompt.interface';

export class ChatPromptTemplateImpl implements IPrompt<ChatPromptTemplate> {
  create(config: PromptConfig): ChatPromptTemplate {
    // --- Mode 1: fromTemplate (single template string) ---
    if (config.template && (!config.messages || config.messages.length === 0)) {
      return ChatPromptTemplate.fromTemplate(config.template);
    }

    // --- Mode 2: fromMessages (array of message parts) ---
    if (config.messages && config.messages.length > 0) {
      const parts = config.messages.map((m) => {
        if (m instanceof MessagesPlaceholder) return m;

        switch (m.role) {
          case 'system':
            return SystemMessagePromptTemplate.fromTemplate(m.template);
          case 'human':
            return HumanMessagePromptTemplate.fromTemplate(m.template);
          default:
            throw new Error(`Unsupported message role: ${JSON.stringify(m)}`);
        }
      });
      return ChatPromptTemplate.fromMessages(parts);
    }

    throw new Error(
      'ChatPromptTemplate requires either a single template or a messages array.'
    );
  }
}
