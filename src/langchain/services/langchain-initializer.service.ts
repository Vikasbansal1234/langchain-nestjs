/* eslint-disable */
import { Injectable, OnModuleInit } from '@nestjs/common';

import { GraphDiscoveryService } from './graph-discovery.service';
import { ModelDiscoveryService } from './model-discovery.service';
import { ParserDiscoveryService } from './parser-discovery.service';
import { PromptDiscoveryService } from './prompt-discovery.service';
import { RetrieverDiscoveryService } from './retriever-discovery.service';
import { ToolDiscoveryService } from './tool-discovery.service';
import { VectorStoreDiscoveryService } from './vector-discovery.service';
import { AgentDiscoveryService } from './agent-discovery.service';


/**
 * Run discovery for all LangChain modules in one place.
 */
@Injectable()
export class LangchainInitializer implements OnModuleInit {
  constructor(
    private readonly prompt: PromptDiscoveryService,
    private readonly model: ModelDiscoveryService,
    private readonly parser: ParserDiscoveryService,
    private readonly vector: VectorStoreDiscoveryService,
    private readonly retriever: RetrieverDiscoveryService,
    private readonly tool: ToolDiscoveryService,
    private readonly agent: AgentDiscoveryService,
    private readonly graph: GraphDiscoveryService,
  ) {}

  async onModuleInit() {
    // each discovery runs automatically,
    // but this ensures they are all instantiated.
    [
      this.prompt,
      this.model,
      this.parser,
      this.vector,
      this.retriever,
      this.tool,
      this.agent,
      this.graph,
    ].forEach(svc => svc.getRegistry());
  }
}
