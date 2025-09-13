/* eslint-disable */
import { ModelKind, Provider } from '../enums/model.enums';
import { ChatOpenAIImpl } from '../impl/models/openai/chat-openai.impl';
import { OpenAIEmbeddingsImpl } from '../impl/models/openai/openai-embeddings.impl';
import { IModel, ModelConfig } from '../interfaces/model.interface';

const registry: Map<Provider, Map<ModelKind, IModel>> = new Map<Provider, Map<ModelKind, IModel>>([
  [
    Provider.OpenAI,
    new Map<ModelKind, IModel>([
      [ModelKind.Chat, new ChatOpenAIImpl()],
      [ModelKind.Embeddings, new OpenAIEmbeddingsImpl()],
    ]),
  ],
]);

export class ModelFactory {
  static create<T>(config: ModelConfig): T {
    const impl = registry.get(config.provider)?.get(config.kind);
    if (!impl) {
      throw new Error(
        `No model implementation for provider=${config.provider} kind=${config.kind}`,
      );
    }
    return impl.create(config) as T;
  }
}
