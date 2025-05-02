#!/bin/bash

echo "Initializing development environment with synchronized ngrok and n8n..."

# Check if .env file exists, if not create from example
if [ ! -f .env ]; then
  echo "Creating .env file from .env.example"
  cp .env.example .env
  echo "Please edit .env file with your configuration and run this script again."
  exit 0
fi

# Check if ngrok auth token is set
source .env
if [ -z "$NGROK_AUTHTOKEN" ]; then
  echo "ERROR: NGROK_AUTHTOKEN is not set in your .env file."
  echo "Get your auth token from https://dashboard.ngrok.com/get-started/your-authtoken"
  echo "Then add it to your .env file: NGROK_AUTHTOKEN=your_token_here"
  exit 1
fi

# Stop any existing containers
echo "Stopping any existing containers..."
docker-compose -f docker-compose.dev.yml down

# Start only ngrok first
echo "Starting ngrok container to get a stable URL..."
docker-compose -f docker-compose.dev.yml up -d ngrok

echo "Waiting for ngrok to initialize (10 seconds)..."
sleep 10

# Get the ngrok URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"https://[^"]*' | grep -o 'https://[^"]*')

if [ -z "$NGROK_URL" ]; then
  echo "Failed to get ngrok URL. Please check if ngrok is running correctly."
  echo "You can view the ngrok dashboard at http://localhost:4040"
  exit 1
fi

echo "Current ngrok URL: $NGROK_URL"

# Update the .env file with the new URL
sed -i '' "s|WEBHOOK_URL=.*|WEBHOOK_URL=${NGROK_URL}|g" .env
echo "Updated WEBHOOK_URL in .env file to: $NGROK_URL"

# Now start n8n with the correct URL already in environment
echo "Starting n8n container with current ngrok URL..."
docker-compose -f docker-compose.dev.yml up -d n8n

echo "Waiting for n8n to initialize (15 seconds)..."
sleep 15

# Verify environment variables are correctly set
echo "Verifying n8n environment variables..."
N8N_VARS=$(docker exec repo-manager-n8n env | grep -E "N8N_WEBHOOK_URL|N8N_EDITOR_BASE_URL")

echo ""
echo "================================================"
echo "DEVELOPMENT ENVIRONMENT READY"
echo "================================================"
echo "ngrok URL: ${NGROK_URL}"
echo ""
echo "n8n environment variables:"
echo "$N8N_VARS"
echo ""
echo "n8n is available at: http://localhost:5678"
echo "ngrok dashboard is available at: http://localhost:4040"
echo ""
echo "When creating webhook nodes in n8n:"
echo "- They should automatically use: ${NGROK_URL} as the base URL"
echo "- If they don't, try creating a new workflow"
echo ""
echo "IMPORTANT: If you need to restart the environment, always use this script"
echo "rather than docker-compose commands directly to ensure synchronized URLs."
echo "================================================"