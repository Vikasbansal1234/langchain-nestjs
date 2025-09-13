/* eslint-disable */
import { TOOL_METADATA_KEY } from '../constants';

/**
 * ToolFactory is optional because tools are usually just class methods
 * discovered by metadata. If you want to wrap them, you can keep a registry.
 */
export class ToolFactory {
  // Example placeholder – can be extended to build tool wrappers
  static create<T>(method: Function): T {
    return method as unknown as T;
  }
}
