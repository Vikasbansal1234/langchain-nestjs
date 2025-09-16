/* eslint-disable */
// export interface ChainConfig {
//   name: string;          // unique key
//   modelRef: string;      // property name of the model instance
//   promptRef: string;     // property name of the prompt instance
//   parserRef?: string;    // optional property name of the parser instance
// }

/* eslint-disable */
import { ModelConfig } from './model.interface';
import { PromptConfig } from './prompt.interface';
import { ParserConfig } from './parser.interface';

/** 🔹 Option 1 – Reference existing instances */
export interface ChainConfigRefs {
  name: string;          // unique registry key
  modelRef: string;      // property name of the model instance
  promptRef: string;     // property name of the prompt instance
  parserRef?: string;    // optional property name of the parser instance
}

/** 🔹 Option 2 – Inline configuration objects */
export interface ChainConfigInline {
  name: string;          // unique registry key
  model: ModelConfig;    // full model configuration
  prompt: PromptConfig;  // full prompt configuration
  parser?: ParserConfig; // optional parser configuration
}

/** 🔑 Final Union Type */
export type ChainConfig = ChainConfigRefs | ChainConfigInline;
