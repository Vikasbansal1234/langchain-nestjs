/* eslint-disable */
import { OpenAIEmbeddings } from '@langchain/openai';
import { IModel, ModelConfig } from '../../../interfaces/model.interface';

/**
 * OpenAI Embeddings model wrapper.
 *
 * This allows you to register and discover an OpenAI embeddings model
 * using the same decorator/factory pattern as ChatOpenAIImpl.
 */
export class OpenAIEmbeddingsImpl implements IModel<OpenAIEmbeddings> {
  create(config: ModelConfig): OpenAIEmbeddings {
    return new OpenAIEmbeddings({
      modelName:   config.model,        // e.g. 'text-embedding-3-large'
      apiKey:      config.apiKey,       // pass from env or config
      // Optional: You can also provide baseUrl, dimensions, etc.
    });
  }
}
