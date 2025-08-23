import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { LangchainInitializer } from './initializers/lc.initializer';
import { SummaryChain } from './examples/summary.chain';
import {
  JokeJsonOutputParserService,
  JokeJsonOutputToolsParserService,
  JokeJsonKeyOutputToolsParserService,
} from './services';

@Module({
  imports: [DiscoveryModule],
  providers: [
    LangchainInitializer,
    SummaryChain,
    JokeJsonOutputParserService,
    JokeJsonOutputToolsParserService,
    JokeJsonKeyOutputToolsParserService,
  ],
  exports: [
    LangchainInitializer,
    SummaryChain,
    JokeJsonOutputParserService,
    JokeJsonOutputToolsParserService,
    JokeJsonKeyOutputToolsParserService,
  ],
})
export class LangchainModule {}
