#!/bin/bash

echo "🧪 Testing LangChain NestJS Integration"
echo "======================================"

# Set environment variables for testing
export MODE=cli
export OPENAI_API_KEY=${OPENAI_API_KEY:-"your-openai-api-key-here"}

# Check if OpenAI API key is set
if [ "$OPENAI_API_KEY" = "your-openai-api-key-here" ]; then
    echo "⚠️  Warning: Please set your OPENAI_API_KEY environment variable"
    echo "   Example: export OPENAI_API_KEY=sk-..."
    echo ""
fi

echo "🚀 Running LangChain CLI test..."
echo ""

# Run the NestJS application in CLI mode
npm run start:dev
