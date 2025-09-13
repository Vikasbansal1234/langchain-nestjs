/* eslint-disable */
import { PromptKind } from '../enums/prompt.enums';
import { PromptTemplateImpl } from '../impl/prompts/prompt-template.impl';
import { IPrompt, PromptConfig } from '../interfaces/prompt.interface';

const registry: Map<PromptKind, IPrompt> = new Map([
  [PromptKind.PromptTemplate, new PromptTemplateImpl()],
  // Add ChatPromptTemplateImpl, FewShotChatPromptImpl, etc.
]);

export class PromptFactory {
  static create<T>(config: PromptConfig): T {
    const impl = registry.get(config.kind);
    if (!impl) {
      throw new Error(`No prompt implementation for kind: ${config.kind}`);
    }
    return impl.create(config) as T;
  }
}
