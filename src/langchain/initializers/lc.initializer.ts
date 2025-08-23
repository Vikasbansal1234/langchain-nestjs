import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import {
  META_CHAINS,
  META_MODELS,
  META_PARSERS,
  META_PROMPTS,
} from '../constants/lc.symbols';
import { ModelFactory } from '../factories/model.factory';
import { PromptFactory } from '../factories/prompt.factory';
import { ParserFactory } from '../factories/parser.factory';
import { ChainFactory } from '../factories/chain.factory';

@Injectable()
export class LangchainInitializer implements OnModuleInit {
  constructor(private readonly discovery: DiscoveryService) {}

  async onModuleInit() {
    const providers = await this.discovery.getProviders();
    
    for (const wrapper of providers) {
      const instance = wrapper?.instance;
      const metatype = wrapper?.metatype;
      
      if (!instance || !metatype) continue;

      // 1. Initialize Models
      const modelMetas = Reflect.getOwnMetadata(META_MODELS, metatype) ?? [];
      for (const { propertyKey, config } of modelMetas) {
        instance[propertyKey] = ModelFactory.create(config);
      }

      // 2. Initialize Prompts
      const promptMetas = Reflect.getOwnMetadata(META_PROMPTS, metatype) ?? [];
      for (const { propertyKey, config } of promptMetas) {
        instance[propertyKey] = PromptFactory.create(config);
      }

      // 3. Initialize Parsers
      const parserMetas = Reflect.getOwnMetadata(META_PARSERS, metatype) ?? [];
      for (const { propertyKey, config } of parserMetas) {
        instance[propertyKey] = ParserFactory.create(config);
      }

      // 4. Initialize Chains
      const chainMetas = Reflect.getOwnMetadata(META_CHAINS, metatype) ?? [];
      for (const { propertyKey, config } of chainMetas) {
        instance[propertyKey] = ChainFactory.create(config, instance);
      }
    }
  }
}
