import "dotenv/config";
import { z } from "zod";

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { toJsonSchema } from "@langchain/core/utils/json_schema";

// Parsers
import { JsonOutputParser } from "@langchain/core/output_parsers";
import {
  JsonOutputToolsParser,
  JsonOutputKeyToolsParser,
} from "@langchain/core/output_parsers/openai_tools";

const pp = (x) => console.log(JSON.stringify(x, null, 2));

const llm = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0,
  maxRetries: 0,
});

/** -----------------------------------------------------------
 * Zod → JSON Schema (use toJsonSchema to avoid schema issues)
 * ----------------------------------------------------------*/
const WeatherParams = z.object({
  location: z.string().describe("City or place name"),
});
const TimeParams = z.object({
  city: z.string().describe("City name"),
});

// Convert with LangChain helper (accepts Zod directly)
const weatherJson = toJsonSchema(WeatherParams);
const timeJson = toJsonSchema(TimeParams);

// Sanity check: must be type "object"
// console.log("\nWeather tool schema:");
// pp(weatherJson);
// console.log("\nTime tool schema:");
// pp(timeJson);

// OpenAI-style tools
const tools = [
  {
    type: "function",
    function: {
      name: "getWeather",
      description: "Get weather for a location",
      parameters: weatherJson, // must be { type: "object", properties: ... }
    },
  },
  {
    type: "function",
    function: {
      name: "getTime",
      description: "Get local time for a city",
      parameters: timeJson,
    },
  },
];
const functions = [
     {
        name: "getWeather",
        description: "Get weather for a location",
        parameters: weatherJson, // must be { type: "object", properties: ... }
      },
    
     {
        name: "getTime",
        description: "Get local time for a city",
        parameters: timeJson,
      },
    
  ];
/* ================================================================
 * DEMO 1: JsonOutputParser (no tools)
 * ================================================================*/
async function demoJsonOutputParser_NoTools() {
  console.log("\n=== DEMO 1: JsonOutputParser (no tools) ===");

  const parser = new JsonOutputParser();
  const format = parser.getFormatInstructions();

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You ONLY reply with valid JSON. No prose."],
    [
      "user",
      `Return {"weatherCity": string, "timeCity": string} for "Delhi" & "Tokyo".\n${format}`,
    ],
  ]);

  const chain = prompt.pipe(llm).pipe(parser);
  const out = await chain.invoke({});
  pp(out);
}

/* ==========================================================================
 * DEMO 2: JsonOutputToolsParser (tools on, possibly multiple calls)
 * ========================================================================*/
async function demoJsonOutputToolsParser_MultiCalls() {
  console.log("\n=== DEMO 2: JsonOutputToolsParser (tools on, possibly multiple calls) ===");

  const llmWithTools = llm.bind({ tools });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "user",
      "Please tell me the weather in Delhi AND the local time in Tokyo. Use the appropriate tools.",
    ],
  ]);

  const chain = prompt.pipe(llmWithTools).pipe(new JsonOutputToolsParser());
  const calls = await chain.invoke({});
  // Expect something like:
  // [
  //   { "type": "getWeather", "args": { "location": "Delhi" } },
  //   { "type": "getTime",    "args": { "city": "Tokyo"   } }
  // ]
  pp(calls);
}

// async function demoJsonOutputFunctionsParser_MultiCalls() {
//     console.log("\n=== DEMO 2: JsonOutputToolsParser (tools on, possibly multiple calls) ===");
  
//     const llmWithFunctions = llm.bind({ functions });
  
//     const prompt = ChatPromptTemplate.fromMessages([
//       [
//         "user",
//         "Please tell me the weather in Delhi AND the local time in Tokyo. Use the appropriate functions.",
//       ],
//     ]);
  
//     const chain = prompt.pipe(llmWithFunctions).pipe(new JsonOutputFunctionsParser());
//     const calls = await chain.invoke({});
//     // Expect something like:
//     // [
//     //   { "type": "getWeather", "args": { "location": "Delhi" } },
//     //   { "type": "getTime",    "args": { "city": "Tokyo"   } }
//     // ]
//     pp(calls);
//   }

/* ======================================================================================
 * DEMO 3: JsonOutputKeyToolsParser (tools on, force one tool & extract one key)
 * ====================================================================================*/
async function demoJsonOutputKeyToolsParser_SingleKey() {
  console.log("\n=== DEMO 3: JsonOutputKeyToolsParser (extract a single key) ===");

  // Force only getWeather to be called
  const llmForceWeather = llm.bind({
    tools,
    tool_choice: { type: "function", function: { name: "getTime" } },
  });

  // Extract just the "location" field from the tool's args
  const keyParser = new JsonOutputKeyToolsParser({
    keyName: "city",
    returnSingle: true,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "user",
      "Call ONLY getWeather for Bengaluru and return the location via the tool.",
    ],
  ]);

  const chain = RunnableSequence.from([prompt, llmForceWeather, keyParser]);
  const location = await chain.invoke({});
  // Expect: "Bengaluru"
  pp(location);
}

(async () => {
  try {
    //await demoJsonOutputParser_NoTools();
   // await demoJsonOutputToolsParser_MultiCalls();
  //  await demoJsonOutputFunctionsParser_MultiCalls();
    await demoJsonOutputKeyToolsParser_SingleKey();
    console.log("\nAll demos done ✅");
  } catch (err) {
    console.error("\nError running demos:", err);
  }
})();
