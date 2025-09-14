/* eslint-disable */

/**
 * Configuration object for LangGraph graphs.
 */
export interface GraphConfig {
  name: string;
}

/**
 * Node definition discovered by decorators.
 */
export interface GraphNodeMeta {
  propertyKey: string | symbol;
  config: {
    name: string;
    sources?: string[];
    targets?: string[];
  };
  method: Function;
}

/**
 * Edge definition discovered by decorators.
 */
export interface GraphEdgeMeta {
  config: {
    from: string;
  };
  method: Function;
}
