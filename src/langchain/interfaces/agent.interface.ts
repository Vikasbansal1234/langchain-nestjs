/* eslint-disable */

/**
 * Configuration for an agent.
 */
export interface AgentConfig {
  name: string;             // Unique registry key
  modelRef: string;         // Property name of the model to use
  toolRefs?: string[];      // Property names of tools
  kind?: string;            // Agent architecture (react, plan-execute, etc.)
  options?: Record<string, any>; // Extra creation options
}

/**
 * Interface implemented by agent builders (optional).
 */
export interface IAgent<T = any> {
  create?(config: AgentConfig, deps: Record<string, any>): T;
}
