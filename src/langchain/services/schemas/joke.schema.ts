import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schema for joke parameters
export const jokeSchema = z.object({
  setup: z.string().describe('The setup for the joke'),
  punchline: z.string().describe('The punchline'),
});

// Export the type for TypeScript usage
export type JokeOutput = z.infer<typeof jokeSchema>;


// Tool definition factory using corrected schema
export const createJokeTool = () => ({
  type: 'function' as const,
  function: {
    name: 'joke',
    description: 'Tell a joke to the user',
    parameters: {
        type: "object",
        properties: zodToJsonSchema(jokeSchema),
      },
    },
});
