/* eslint-disable */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { PROMPT_METADATA_KEY } from '../constants';
import { PromptFactory } from '../factories/prompt.factory';
import { PromptConfig } from '../interfaces/prompt.interface';


type PromptMeta = { propertyKey: string | symbol; config: PromptConfig };

@Injectable()
export class PromptDiscoveryService implements OnModuleInit {
  private readonly registry: Record<string, any> = {};
  constructor(private readonly discovery: DiscoveryService) {}

  getRegistry() {
    return this.registry;
  }

  async onModuleInit() {
    const providers = await this.discovery.getProviders();
    for (const wrapper of providers) {
      const instance = wrapper?.instance;
      const metatype = wrapper?.metatype;
      if (!instance || !metatype) continue;

      const metas = Reflect.getOwnMetadata(
        PROMPT_METADATA_KEY,
        metatype,
      ) as PromptMeta[] | undefined;

      if (!metas) continue;
      for (const { propertyKey, config } of metas) {
        const prompt = PromptFactory.create(config);
        (instance as any)[propertyKey] = prompt;
        this.registry[config.name] = prompt;
      }
    }
  }
}
