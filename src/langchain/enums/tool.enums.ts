/* eslint-disable */

/**
 * Optional classification of tools.
 * Useful if you want to group or filter tools by category.
 */
export enum ToolKind {
  Function = 'function',   // OpenAI-style function tool
  API      = 'api',        // External API call
  Utility  = 'utility',    // Internal helper
}
