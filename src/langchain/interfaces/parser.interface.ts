/* eslint-disable */
import { ParserKind } from '../enums/parser.enums';

/**
 * Configuration for an output parser.
 */
export interface ParserConfig {
  name: string;                  // Unique registry key
  kind: ParserKind;               // Parser type
  keys?: string[];                // Keys to extract (JSONKey / CommaSeparated)
  schema?: Record<string, any>;   // Zod schema (Structured parser)
}

/**
 * Interface implemented by all parser wrappers.
 */
export interface IParser<T = any> {
  create(config: ParserConfig): T;
}
