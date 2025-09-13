/* eslint-disable */
import 'reflect-metadata';
import { AGENT_METADATA_KEY } from '../constants';
import { AgentConfig } from '../interfaces/agent.interface';
type AgentMeta = { propertyKey: string | symbol; config: AgentConfig };

export function Agent(config: AgentConfig): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const existing =
      (Reflect.getOwnMetadata(
        AGENT_METADATA_KEY,
        (target as any).constructor,
      ) as AgentMeta[] | undefined) ?? [];

    const updated: AgentMeta[] = [...existing, { propertyKey, config }];

    Reflect.defineMetadata(
      AGENT_METADATA_KEY,
      updated,
      (target as any).constructor,
    );
  };
}
