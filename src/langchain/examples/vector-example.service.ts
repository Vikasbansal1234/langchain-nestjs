/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { VectorStore } from '../decorators/vector.decorator';
import { VectorStoreKind } from '../enums/vector.enums';
import { Model } from '../decorators/model.decorator';
import { Provider, ModelKind } from '../enums/model.enums';

/**
 * Example service registering a Redis Vector Store
 * through the @VectorStore decorator.
 */
@Injectable()
export class VectorExampleService {
  @VectorStore({
    name: 'redisStore',
    kind: VectorStoreKind.Redis,
    indexName: 'langchain-index',
    embeddingsRef: 'embeddings',   // must match a property in this instance or dependencies
    clientRef: 'redisClient',      // must match a property in this instance or dependencies
  })
  redisVector!: any; // Will be RedisVectorStore after discovery

  @Model({
    name: 'openaiEmbeddings',
    provider: Provider.OpenAI,
    kind: ModelKind.Embeddings,
    model: 'text-embedding-3-large',
  })
  embeddings!: any; // Will be OpenAIEmbeddings after discovery


  /**
   * Add a sample document to the Redis vector index.
   */
  async addSampleDocument() {
    console.log('Embedding type:', this.embeddings.constructor.name);
    await this.redisVector.addDocuments([
      {
        pageContent: 'Apple is a red fruit.',
        metadata: { category: 'fruit' },
      },
    ]);
    return 'Document added to Redis vector store!';
  }

  /**
   * Query the vector store for similar documents.
   */
  async querySimilar(text: string) {
    const results = await this.redisVector.similaritySearch(text, 2);
    return results.map((doc: any) => ({
      content: doc.pageContent,
      metadata: doc.metadata,
    }));
  }
}
