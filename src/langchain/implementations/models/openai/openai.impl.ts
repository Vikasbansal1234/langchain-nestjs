import { OpenAI } from '@langchain/openai';
import { IModel, ModelConfig } from '../../../interfaces/model.interface';

export class OpenAIImpl implements IModel<OpenAI> {
  create(config: ModelConfig): OpenAI {
    return new OpenAI({
      modelName: config.model,
      temperature: config.temperature ?? 0.7,
    });
  }
}
