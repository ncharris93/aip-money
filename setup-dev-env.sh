#!/bin/bash

echo "Starting n8n and ngrok setup for local development..."

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

# Start the containers
echo "Starting Docker containers..."
docker-compose -f docker-compose.dev.yml up -d

echo "Waiting for ngrok to initialize (10 seconds)..."
sleep 10

# Get the ngrok URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"https://[^"]*' | grep -o 'https://[^"]*')

if [ -z "$NGROK_URL" ]; then
  echo "Failed to get ngrok URL. Please check if ngrok is running correctly."
  echo "You can view the ngrok dashboard at http://localhost:4040"
  exit 1
fi

echo "ngrok URL: $NGROK_URL"
echo "n8n is available at: http://localhost:5678"

# Update the .env file with the webhook URL
WEBHOOK_URL="${NGROK_URL}/webhook"
sed -i '' "s|WEBHOOK_URL=.*|WEBHOOK_URL=${WEBHOOK_URL}|g" .env

echo ""
echo "================================================"
echo "IMPORTANT: FREE NGROK PLAN INFORMATION"
echo "================================================"
echo "With a free ngrok plan, this URL will change each time you restart ngrok."
echo "You will need to update your GitHub webhook URL accordingly each time."
echo ""
echo "================================================"
echo "Setup GitHub Webhook with these settings:"
echo "================================================"
echo "URL: ${WEBHOOK_URL}"
echo "Content type: application/json"
echo "Secret: (leave blank or set your own and update .env)"
echo "Events: Issues, Issue comments"
echo "================================================"
echo ""
echo "You can restart the containers to apply new environment variables:"
echo "docker-compose -f docker-compose.dev.yml down"
echo "docker-compose -f docker-compose.dev.yml up -d"
echo ""
echo "Run this script again after each restart to get the new ngrok URL."