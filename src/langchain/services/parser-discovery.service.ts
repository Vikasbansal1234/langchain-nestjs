/* eslint-disable */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { PARSER_METADATA_KEY } from '../constants';
import { ParserFactory } from '../factories/parser.factory';
import { ParserConfig } from '../interfaces/parser.interface';

type ParserMeta = { propertyKey: string | symbol; config: ParserConfig };

@Injectable()
export class ParserDiscoveryService implements OnModuleInit {
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
        PARSER_METADATA_KEY,
        metatype,
      ) as ParserMeta[] | undefined;

      if (!metas) continue;
      for (const { propertyKey, config } of metas) {
        const parser = ParserFactory.create(config);
        (instance as any)[propertyKey] = parser;
        this.registry[config.name] = parser;
      }
    }
  }
}
