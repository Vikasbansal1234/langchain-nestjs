import { Module } from '@nestjs/common';

import { PromptDiscoveryService } from './services/prompt-discovery.service';
import { ModelDiscoveryService } from './services/model-discovery.service';
import { ParserDiscoveryService } from './services/parser-discovery.service';
import { VectorStoreDiscoveryService } from './services/vector-discovery.service';
import { RetrieverDiscoveryService } from './services/retriever-discovery.service';
import { ToolDiscoveryService } from './services/tool-discovery.service';
import { AgentDiscoveryService } from './services/agent-discovery.service';
import { GraphDiscoveryService } from './services/graph-discovery.service';
import { DiscoveryModule } from '@nestjs/core';
import { TranslationService } from './examples/translation.service';
import { GreetingGraphService } from './examples/greeting.graph';
import { VectorExampleService } from './examples/vector-example.service';
import { SummaryChain } from './examples/summary.chain';
import { ChainDiscoveryService } from './services/chain-discovery.service';
import { WeatherAgentService } from './examples/weather-agent.service';
@Module({
  imports: [DiscoveryModule],
  providers: [
    PromptDiscoveryService,
    ModelDiscoveryService,
    ParserDiscoveryService,
    VectorStoreDiscoveryService,
    RetrieverDiscoveryService,
    ToolDiscoveryService,
    AgentDiscoveryService,
    GraphDiscoveryService,
    ChainDiscoveryService,
    TranslationService,
    GreetingGraphService,
    VectorExampleService,
    WeatherAgentService,
    SummaryChain,
  ],
  exports: [
    PromptDiscoveryService,
    ModelDiscoveryService,
    ParserDiscoveryService,
    VectorStoreDiscoveryService,
    RetrieverDiscoveryService,
    ToolDiscoveryService,
    AgentDiscoveryService,
    GraphDiscoveryService,
    ChainDiscoveryService,
    TranslationService,
    GreetingGraphService,
    VectorExampleService,
    WeatherAgentService,
    SummaryChain,
  ],
})
export class LangchainModule {}
