/* eslint-disable */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { AGENT_METADATA_KEY } from '../constants';
import { AgentFactory } from '../factories/agent.factory';
import { AgentConfig } from '../interfaces/agent.interface';


type AgentMeta = { propertyKey: string | symbol; config: AgentConfig };

@Injectable()
export class AgentDiscoveryService implements OnModuleInit {
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
        AGENT_METADATA_KEY,
        metatype,
      ) as AgentMeta[] | undefined;

      if (!metas) continue;
      for (const { propertyKey, config } of metas) {
        // resolve model/tools from instance using refs
        const model = (instance as any)[config.modelRef];
        const tools = (config.toolRefs ?? []).map(ref => (instance as any)[ref]);
        const agent = AgentFactory.create(() => ({
          model,
          tools,
          config,
        }));
        (instance as any)[propertyKey] = agent;
        this.registry[config.name] = agent;
      }
    }
  }
}
