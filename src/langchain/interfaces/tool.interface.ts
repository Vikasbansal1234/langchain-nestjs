/* eslint-disable */

/**
 * Configuration for a tool function (OpenAI-style).
 */
export interface ToolConfig {
  name: string;               // Tool name exposed to the agent
  description: string;        // Human-readable description
  schema: any;                // Zod schema for input validation
}

/**
 * Interface for custom tool wrappers (optional).
 * Many tools can simply be plain methods discovered via metadata.
 */
export interface ITool<T = any> {
  create?(config: ToolConfig): T;
}
