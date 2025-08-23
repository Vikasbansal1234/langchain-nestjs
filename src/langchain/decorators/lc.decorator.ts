import 'reflect-metadata';
import {
  META_MODELS,
  META_PROMPTS,
  META_PARSERS,
  META_CHAINS,
} from '../constants/lc.symbols';
import {
  ModelConfig,
  PromptConfig,
  ParserConfig,
  ChainConfig,
} from '../interfaces/lc.types';

function pushMeta(key: symbol, target: any, entry: any) {
  const ctor = target.constructor;
  const current = Reflect.getOwnMetadata(key, ctor) ?? [];
  Reflect.defineMetadata(key, [...current, entry], ctor);
}

export const LC = {
  Model: (config: ModelConfig): PropertyDecorator =>
    (target, propertyKey) => pushMeta(META_MODELS, target, { propertyKey, config }),
  
  Prompt: (config: PromptConfig): PropertyDecorator =>
    (target, propertyKey) => pushMeta(META_PROMPTS, target, { propertyKey, config }),
  
  Parser: (config: ParserConfig): PropertyDecorator =>
    (target, propertyKey) => pushMeta(META_PARSERS, target, { propertyKey, config }),
  
  Chain: (config: ChainConfig): PropertyDecorator =>
    (target, propertyKey) => pushMeta(META_CHAINS, target, { propertyKey, config }),
};
