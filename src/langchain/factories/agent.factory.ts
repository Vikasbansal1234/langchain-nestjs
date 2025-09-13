/* eslint-disable */
import { AGENT_METADATA_KEY } from '../constants';

/**
 * AgentFactory is typically a wrapper around LangChain's createReactAgent
 * or custom builders. You can expand this as needed.
 */
export class AgentFactory {
  static create<T>(builder: () => T): T {
    return builder();
  }
}
