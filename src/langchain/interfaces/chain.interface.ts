/* eslint-disable */
export interface ChainConfig {
  name: string;          // unique key
  modelRef: string;      // property name of the model instance
  promptRef: string;     // property name of the prompt instance
  parserRef?: string;    // optional property name of the parser instance
}
