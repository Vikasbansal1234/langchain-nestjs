/* eslint-disable */
// src/langchain/services/agent-discovery.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';

import { ToolFactory } from '../factories/tool.factory';
import { AgentFactory } from '../factories/agent.factory';
import { TOOL_METADATA_KEY, AGENT_METADATA_KEY } from '../constants';

@Injectable()
export class AgentDiscoveryService implements OnModuleInit {
  constructor(private readonly discovery: DiscoveryService) {}

  private readonly registry = {
    tools: {} as Record<string, any>,
    agents: {} as Record<string, any>,
  };

  getRegistry() {
    return this.registry;
  }

  async onModuleInit() {
    const providers = await this.discovery.getProviders();

    for (const wrapper of providers) {
      const instance = wrapper?.instance;
      const metatype = wrapper?.metatype;
      if (!instance || !metatype) continue;

      // 1️⃣ Discover Tools (create them here)
      const toolMetas: any[] = Reflect.getOwnMetadata(TOOL_METADATA_KEY, metatype) ?? [];
      for (const { propertyKey, config, method } of toolMetas) {
        const tool = ToolFactory.create({ ...config, method });
        instance[propertyKey] = tool;
        this.registry.tools[config.name] = tool;
      }

      // 2️⃣ Discover Agents (reuse model reference, DO NOT create model)
      const agentMetas: any[] = Reflect.getOwnMetadata(AGENT_METADATA_KEY, metatype) ?? [];
      for (const { propertyKey, config } of agentMetas) {
        const agent = AgentFactory.create(config, instance); // model is fetched from instance[modelRef]
        instance[propertyKey] = agent;
        this.registry.agents[config.name ?? String(propertyKey)] = agent;
      }
    }
  }
}
