/* eslint-disable */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { TOOL_METADATA_KEY } from '../constants';
import { ToolConfig } from '../decorators/tool.decorator';


type ToolMeta = {
  propertyKey: string | symbol;
  config: ToolConfig;
  method: Function;
};

@Injectable()
export class ToolDiscoveryService implements OnModuleInit {
  private readonly registry: Record<string, Function> = {};
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
        TOOL_METADATA_KEY,
        metatype,
      ) as ToolMeta[] | undefined;

      if (!metas) continue;
      for (const { propertyKey, config, method } of metas) {
        // Store a callable function bound to its instance
        const bound = method.bind(instance);
        (instance as any)[propertyKey] = bound;
        this.registry[config.name] = bound;
      }
    }
  }
}
