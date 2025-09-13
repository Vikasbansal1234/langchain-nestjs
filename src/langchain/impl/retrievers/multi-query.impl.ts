/* eslint-disable */
import { MultiQueryRetriever } from 'langchain/retrievers/multi_query';
import { IRetriever, RetrieverConfig } from '../../interfaces/retriever.interface';

export class MultiQueryRetrieverImpl implements IRetriever {
  async create(config: RetrieverConfig, deps: Record<string, any>) {
    const llm = deps[config.llmRef!];
    const vectorStore = deps[config.vectorStoreRef];
    return MultiQueryRetriever.fromLLM({
      llm,
      retriever: vectorStore.asRetriever(config.config || {}),
    });
  }
}
