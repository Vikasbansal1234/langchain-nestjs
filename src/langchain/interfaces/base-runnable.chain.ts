import { RunnableConfig, Runnable } from '@langchain/core/runnables';

export abstract class BaseRunnableChain<
  Input,
  Output,
  Config extends RunnableConfig = RunnableConfig,
> extends Runnable<Input, Output, Config> {
  protected abstract get chain(): Runnable<Input, Output, Config>;

  lc_namespace: string[] = ['decorator', '`chain'];
  lc_runnable = true;
  lc_serializable = false;

  override invoke(input: Input, config?: Config) {
    return this.chain.invoke(input, config);
  }

  override stream(input: Input, config?: Config) {
    return this.chain.stream(input, config);
  }
}
