/* eslint-disable */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { RETRIEVER_METADATA_KEY } from '../constants';
import { RetrieverFactory } from '../factories/retriever.factory';
import { RetrieverConfig } from '../interfaces/retriever.interface';

type RetrieverMeta = { propertyKey: string | symbol; config: RetrieverConfig };

@Injectable()
export class RetrieverDiscoveryService implements OnModuleInit {
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
        RETRIEVER_METADATA_KEY,
        metatype,
      ) as RetrieverMeta[] | undefined;

      if (!metas) continue;
      for (const { propertyKey, config } of metas) {
        const retriever = await RetrieverFactory.create(config, instance as Record<string, any>);
        (instance as any)[propertyKey] = retriever;
        this.registry[config.name] = retriever;
      }
    }
  }
}
