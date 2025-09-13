/* eslint-disable */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { STATE_METADATA_KEY, NODE_METADATA_KEY, EDGE_METADATA_KEY, GRAPH_METADATA_KEY } from '../constants';
import { GraphFactory } from '../factories/graph.factory';


@Injectable()
export class GraphDiscoveryService implements OnModuleInit {
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

      const stateMeta = Reflect.getOwnMetadata(STATE_METADATA_KEY, metatype);
      const nodeMetas = Reflect.getOwnMetadata(NODE_METADATA_KEY, metatype) || [];
      const edgeMetas = Reflect.getOwnMetadata(EDGE_METADATA_KEY, metatype) || [];
      const graphMeta = Reflect.getOwnMetadata(GRAPH_METADATA_KEY, metatype);

      if (!graphMeta) continue;
      const compiled = GraphFactory.create({
        state: stateMeta.config.schema(),
        nodes: nodeMetas,
        edges: edgeMetas,
      });

      (instance as any)[graphMeta.propertyKey] = compiled;
      this.registry[graphMeta.config.name] = compiled;
    }
  }
}
