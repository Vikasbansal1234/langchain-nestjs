// src/langchain/constants/metadata-keys.ts

/**
 * Shared metadata keys used by all LangChain decorators.
 * Each key is unique to prevent collisions across modules.
 * These keys are consumed by DiscoveryService to locate metadata
 * during runtime initialization.
 */

/* ---------- Core LangChain Components ---------- */
export const PROMPT_METADATA_KEY = Symbol('lc:prompt');
export const MODEL_METADATA_KEY = Symbol('lc:model');
export const PARSER_METADATA_KEY = Symbol('lc:parser');
export const VECTOR_STORE_METADATA_KEY = Symbol('lc:vectorstore');
export const RETRIEVER_METADATA_KEY = Symbol('lc:retriever');
export const TOOL_METADATA_KEY = Symbol('lc:tool');
export const AGENT_METADATA_KEY = Symbol('lc:agent');

/* ---------- LangGraph Specific ---------- */
export const STATE_METADATA_KEY = Symbol('lcgraph:state');
export const NODE_METADATA_KEY = Symbol('lcgraph:node');
export const EDGE_METADATA_KEY = Symbol('lcgraph:edge');
export const GRAPH_METADATA_KEY = Symbol('lcgraph:graph');
export const CHAIN_METADATA_KEY = Symbol('lc:chain:metadata');

/**
 * ✅ Usage Example
 *
 * Reflect.defineMetadata(PROMPT_METADATA_KEY, config, target, propertyKey);
 * const metas = Reflect.getOwnMetadata(PROMPT_METADATA_KEY, target.constructor);
 *
 * These symbols ensure isolation between modules
 * and safe retrieval inside discovery services.
 */
