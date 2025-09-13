/* eslint-disable */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { VECTOR_STORE_METADATA_KEY } from '../constants';
import { VectorStoreFactory } from '../factories/vector.factory';
import { VectorStoreConfig } from '../interfaces/vector.interface';


type VectorMeta = { propertyKey: string | symbol; config: VectorStoreConfig };

@Injectable()
export class VectorStoreDiscoveryService implements OnModuleInit {
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
        VECTOR_STORE_METADATA_KEY,
        metatype,
      ) as VectorMeta[] | undefined;

      if (!metas) continue;
      for (const { propertyKey, config } of metas) {
        // Pass instance as deps container for embeddings/clients
        const vector = await VectorStoreFactory.create(config, instance as Record<string, any>);
        (instance as any)[propertyKey] = vector;
        this.registry[config.name] = vector;
      }
    }
  }
}
