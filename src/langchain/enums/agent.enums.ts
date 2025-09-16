/* eslint-disable */

/**
 * Supported agent architectures.
 */
export enum AgentKind {
  
  React         = 'react',          // Reason + Act
  PlanExecute   = 'plan-execute',   // Planner + Executor
  Hierarchical  = 'hierarchical',   // Multi-team supervisors
  Router        = 'router',         // Dynamic routing agent
}
