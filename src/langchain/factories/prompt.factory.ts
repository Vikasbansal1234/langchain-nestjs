import { PromptKind } from '../enums/lc.enums';
import { PromptConfig, IPrompt } from '../interfaces/prompt.interface';

// Implementations
import { ChatPromptImpl } from '../implementations/prompts/chat-prompt.impl';
import { StringPromptImpl } from '../implementations/prompts/string-prompt.impl';

export class PromptFactory {
  private static readonly registry = new Map<PromptKind, IPrompt>([
    [PromptKind.Chat, new ChatPromptImpl()],
    [PromptKind.String, new StringPromptImpl()],
  ]);

  static create<T>(config: PromptConfig): T {
    const impl = PromptFactory.registry.get(config.kind);
    if (!impl) throw new Error(`No prompt found for ${config.kind}`);
    return impl.create(config);
  }
}
