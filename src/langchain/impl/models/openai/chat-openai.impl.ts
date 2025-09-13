/* eslint-disable */
import { ChatOpenAI } from '@langchain/openai';
import { IModel, ModelConfig } from '../../../interfaces/model.interface';

/**
 * OpenAI chat model wrapper.
 */
export class ChatOpenAIImpl implements IModel<ChatOpenAI> {
  create(config: ModelConfig): ChatOpenAI {
    return new ChatOpenAI({
      modelName:   config.model,
      temperature: config.temperature ?? 0.7,
      apiKey:      config.apiKey,
      // You can extend with baseUrl, deploymentName, etc.
    });
  }
}
