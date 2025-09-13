/* eslint-disable */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { MODEL_METADATA_KEY } from '../constants';
import { ModelFactory } from '../factories/model.factory';
import { ModelConfig } from '../interfaces/model.interface';

type ModelMeta = { propertyKey: string | symbol; config: ModelConfig };

@Injectable()
export class ModelDiscoveryService implements OnModuleInit {
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
        MODEL_METADATA_KEY,
        metatype,
      ) as ModelMeta[] | undefined;

      if (!metas) continue;
      for (const { propertyKey, config } of metas) {
        const model = ModelFactory.create(config);
        (instance as any)[propertyKey] = model;
        this.registry[config.name] = model;
      }
    }
  }
}
