import fs from "fs";

/**
 * Detects the type of message from its instance
 */
function detectType(msg) {
  if (msg.constructor?.name === "HumanMessage") return "HumanMessage";
  if (msg.constructor?.name === "AIMessage") return "AIMessage";
  if (msg.constructor?.name === "ToolMessage") return "ToolMessage";
  return "Unknown";
}

/**
 * Converts LangChain agent output to simplified format
 * @param {*} data The full agent response (object with `.messages`)
 * @returns Simplified JSON
 */
export function transformAgentOutput(data) {
  const simplified = [];

  for (const msg of data.messages || []) {
    const type = detectType(msg);

    switch (type) {
      case "HumanMessage":
        simplified.push({
          type,
          kwargs: {
            content: msg.content,
          },
        });
        break;

      case "AIMessage":
        simplified.push({
          type,
          tool_calls: msg.tool_calls ?? [],
        });
        break;

      case "ToolMessage":
        simplified.push({
          type,
          kwargs: {
            content: msg.content,
          },
        });
        break;

      default:
        // ignore or log unknown types
        break;
    }
  }

  return simplified;
}

/**
 * Writes the simplified output to agent-summary.json
 * @param {*} originalAgentOutput Full agent output from invoke()
 */
export function simplifyResponse(originalAgentOutput) {
  const simplified = transformAgentOutput(originalAgentOutput);
  fs.writeFileSync("agent-summary.json", JSON.stringify(simplified, null, 2));
  console.log("✅ Simplified output saved to agent-summary.json");
}
