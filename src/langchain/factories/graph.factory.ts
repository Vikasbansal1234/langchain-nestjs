/* eslint-disable */
import { StateGraph, START } from '@langchain/langgraph';
import { RunnableLambda } from '@langchain/core/runnables';

export class GraphFactory {
  static create(meta: {
    state: any;
    nodes: Array<{ config: any; method: (state: any) => any }>;
    edges: Array<{ config: any }>;
  }) {
    const graph = new StateGraph(meta.state);

    for (const n of meta.nodes) {
      graph.addNode(
        n.config.name,
        new RunnableLambda({ func: async (state) => n.method(state) }),
      );
      (n.config.sources ?? []).forEach(src => graph.addEdge(src, n.config.name));
      (n.config.targets ?? []).forEach(tgt => graph.addEdge(n.config.name, tgt));
    }

    for (const e of meta.edges) {
      graph.addConditionalEdges(e.config.from, e.config.method);
    }

    if (!meta.nodes.some(n => n.config.sources?.includes(START))) {
      graph.addEdge(START, meta.nodes[0].config.name);
    }

    return graph.compile();
  }
}
