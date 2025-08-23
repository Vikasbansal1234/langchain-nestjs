import { Provider, ModelKind } from '../enums/lc.enums';
import { ModelConfig, IModel } from '../interfaces/model.interface';

// Implementations
import { ChatOpenAIImpl } from '../implementations/models/openai/chat-openai.impl';
import { OpenAIImpl } from '../implementations/models/openai/openai.impl';
import { OpenAIEmbeddingsImpl } from '../implementations/models/openai/openai-embeddings.impl';

export class ModelFactory {
  private static readonly registry = new Map<Provider, Map<ModelKind, IModel>>([
    [Provider.OpenAI, new Map<ModelKind, IModel>([
      [ModelKind.Chat, new ChatOpenAIImpl()],
      [ModelKind.Completion, new OpenAIImpl()],
      [ModelKind.Embeddings, new OpenAIEmbeddingsImpl()],
    ])]
  ]);

  static create<T>(config: ModelConfig): T {
    const impl = ModelFactory.registry.get(config.provider)?.get(config.kind);
    if (!impl) throw new Error(`No model found for ${config.provider} / ${config.kind}`);
    return impl.create(config);
  }
}
