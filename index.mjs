import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import "dotenv/config";
import { z } from "zod";
import fs from "fs";
import { simplifyResponse } from "./simplify-writer.mjs";
// --- Tool 1: Weather ---
const getWeather = tool(
  async ({ location }) => {
    console.log("[TOOL LOG] get_weather called with:", location);
    return `Mock weather in ${location}: sunny, 25°C.`;
  },
  {
    name: "get_weather",
    description: "Get the current weather for a given location",
    schema: z.object({
      location: z.string(),
    }),
  }
);

// --- Tool 2: Calculator ---
const addNumbers = tool(
  async ({ a, b }) => {
    console.log("[TOOL LOG] add_numbers called with:", a, b);
    return `The sum of ${a} + ${b} = ${a + b}`;
  },
  {
    name: "add_numbers",
    description: "Add two numbers together",
    schema: z.object({
      a: z.number(),
      b: z.number(),
    }),
  }
);

// --- Tool 3: Time ---
const getTime = tool(
  async () => {
    console.log("[TOOL LOG] get_time called");
    return `Current time is ${new Date().toISOString()}`;
  },
  {
    name: "get_time",
    description: "Get the current system time",
    schema: z.object({}), // no args
  }
);

// --- Model ---
const model = new ChatOpenAI({ model: "gpt-4o", temperature: 0 });

// --- Agent with responseFormat ---
const agent = createReactAgent({
  llm: model,
  tools: [getWeather, addNumbers, getTime],
  responseFormat: z.object({
    answer: z.string().describe("The final user-facing answer"),
    source: z.string().describe("Which tool or source was used"),
    timestamp: z.string().describe("When the answer was generated (ISO format)"),
  }),
});

// --- Run ---
(async () => {
  console.log("=== Starting Agent ===");

  const res = await agent.invoke({
    messages: [
      { role: "user", content: "What is the weather in Delhi?" },
      { role: "user", content: "Add 10 and 15." },
      { role: "user", content: "What time is it right now?" },
    ],
  });

  // Dump entire response object to JSON file
  fs.writeFileSync("agent-response.json", JSON.stringify(res, null, 2));
  console.log(res);
  // Save simplified response
  simplifyResponse(res, "agent-response-simplified.json",{keepStructured: false });
  console.log("✅ Full response saved to agent-response.json");
})();
