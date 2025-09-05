import { Injectable } from '@nestjs/common';
import chalk from 'chalk';
import {
    Annotation,
    StateGraph,
    MemorySaver,
    Command,
} from '@langchain/langgraph';
import { SqliteSaver } from "@langchain/langgraph-checkpoint-sqlite";

const StateAnnotation = Annotation.Root({
    country: Annotation(),
    current_time: Annotation(),
});

const timestamp = async (state: any) => {
    return { current_time: new Date() };
};

const graph = new StateGraph(StateAnnotation)
    .addNode('timestamp', timestamp)
    .addEdge('__start__', 'timestamp')
    .addEdge('timestamp', '__end__');


const app = graph.compile({ checkpointer:new MemorySaver() });

@Injectable()
export class LangchainService {
    constructor() {
        console.log(chalk.green.bold('✅ LangchainService Initialized\n'));
    }

    async execute(input: string | null | Command<any>) {
        const threadId = '1';
        const config = { configurable: { thread_id: threadId } };

        await this.printBanner('First Invoke');
        await this.runGraph({ country: "India" }, config);
        // await this.printCurrentState(config);
        await this.printStateHistory(config);

        // Second call with Command (simulate update state)
        await this.printBanner('Replay/Update Invoke');
        await this.updateGraph({ country: "Tokyo" }, config);
        // await this.printCurrentState(config);
        await this.printStateHistory(config);

        await this.printBanner('Second Invoke');
        await this.runGraph(null, config);
        // await this.printCurrentState(config);
        await this.printStateHistory(config);
    }

    private async runGraph(input: any, config: any): Promise<void> {
        const result = await app.invoke(input, config);
        console.log(chalk.blue.bold('\n📤 Final Output from graph.invoke():\n'));
        console.dir(result, { depth: null });
    }

    private async updateGraph(input: any, config: any): Promise<void> {
        const result = await app.updateState(config, new Command({
            update: input
        }));
        console.log(chalk.blue.bold('\n📤 Final Output from graph.invoke():\n'));
        console.dir(result, { depth: null });
    }

    private async printCurrentState(config: any): Promise<void> {
        const state = await app.getState(config);
        console.log(chalk.yellow.bold('\n🔎 Current State via getState():\n'));
        console.dir(state, { depth: null });
    }
    private async printStateHistory(config: any): Promise<void> {
        const statesIterable = await app.getStateHistory(config);
        const statesArray: any = [];

        // Collect all states into an array
        for await (const state of statesIterable) {
            statesArray.push(state);
        }

        // Reverse the array to show oldest → newest
        const reversed = statesArray.reverse();

        console.log(chalk.magentaBright.bold('\n📜 State History (Oldest → Newest):\n'));

        reversed.forEach((state, idx) => {
            console.log(chalk.cyanBright(`--- Checkpoint ${idx + 1} ---`));
            console.dir(state, { depth: null });
            console.log(chalk.gray('----------------------------------------\n'));
        });
    }
    private async updateStateHistoryManually(config: any, patch: any) {
        console.log('\n📦 Updating state history manually with:', patch);

        await app.updateState(patch, config);

        console.log(chalk.greenBright('✅ State updated via updateHistory\n'));

        // Print updated state
        await this.printCurrentState(config);
    }



    private async printBanner(title: string) {
        const bar = chalk.whiteBright('='.repeat(60));
        const header = chalk.bgBlue.white.bold(`\n🚀 ${title.toUpperCase()} 🚀\n`);
        console.log(`\n${bar}${header}${bar}\n`);
    }
}
