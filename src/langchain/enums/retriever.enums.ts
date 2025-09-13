/* eslint-disable */

/**
 * Supported retriever strategies for document retrieval.
 */
export enum RetrieverKind {
  MultiQuery     = 'multi-query',
  MultiVector    = 'multi-vector',
  SelfQuery      = 'self-query',
  ParentDocument = 'parent-document',
  ScoreThreshold = 'score-threshold',
}
