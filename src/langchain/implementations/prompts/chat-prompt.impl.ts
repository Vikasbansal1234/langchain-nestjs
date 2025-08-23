import { ChatPromptTemplate } from '@langchain/core/prompts';
import { IPrompt, PromptConfig } from '../../interfaces/prompt.interface';

export class ChatPromptImpl implements IPrompt<ChatPromptTemplate> {
  create(config: PromptConfig): ChatPromptTemplate {
    if (config.messages?.length) {
      return ChatPromptTemplate.fromMessages(config.messages);
    }
    return ChatPromptTemplate.fromTemplate(config.template);
  }
}
