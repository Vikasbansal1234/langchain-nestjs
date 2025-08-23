import { PromptKind } from '../enums/lc.enums';

export interface PromptConfig {
  kind: PromptKind;
  template: string;
  messages?: [role: 'system' | 'user' | 'assistant', text: string][];
}

export interface IPrompt<T = any> {
  create(config: PromptConfig): T;
}
