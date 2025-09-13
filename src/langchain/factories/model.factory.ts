/* eslint-disable */
import { ModelKind, Provider } from "../enums/model.enums";
import { ChatOpenAIImpl } from "../implementations/models/openai/chat-openai.impl";
import { IModel, ModelConfig } from "../interfaces/model.interface";


const registry: Map<Provider, Map<ModelKind, IModel>> = new Map([
  [Provider.OpenAI, new Map([[ModelKind.Chat, new ChatOpenAIImpl()]])],
  // Add Azure/Groq providers as needed
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
