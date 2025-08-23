import { OpenAIEmbeddings } from '@langchain/openai';
import { IModel, ModelConfig } from '../../../interfaces/model.interface';

export class OpenAIEmbeddingsImpl implements IModel<OpenAIEmbeddings> {
  create(config: ModelConfig): OpenAIEmbeddings {
    return new OpenAIEmbeddings({
      modelName: config.model,
    });
  }
}
