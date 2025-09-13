/* eslint-disable */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';

import { ChainFactory } from '../factories/chain.factory';
import { ChainConfig } from '../interfaces/chain.interface';
import { CHAIN_METADATA_KEY } from '../constants';

/**
 * Scans all providers for @Chain metadata,
 * composes prompt → model → (parser) chains,
 * and assigns them to the decorated properties.
 */
@Injectable()
export class ChainDiscoveryService implements OnModuleInit {
  constructor(private readonly discovery: DiscoveryService) {}

  private readonly registry: Record<string, any> = {};

  getRegisteredChains(): Record<string, any> {
    return this.registry;
  }

  async onModuleInit(): Promise<void> {
    const providers = await this.discovery.getProviders();

    for (const wrapper of providers) {
      const instance = wrapper?.instance;
      const metatype = wrapper?.metatype;
      if (!instance || !metatype) continue;

      const chainMetas:
        Array<{ propertyKey: string; config: ChainConfig }> =
        Reflect.getOwnMetadata(CHAIN_METADATA_KEY, metatype) ?? [];

      for (const { propertyKey, config } of chainMetas) {
        const chain = ChainFactory.create(config, instance);
        instance[propertyKey] = chain;
        this.registry[config.name] = chain;
      }
    }
  }
}
