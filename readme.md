# Money Library

A TypeScript utility library for precise financial calculations with automated AI-driven maintenance.

## Project Overview

This project demonstrates how to leverage n8n workflows and AI agents to automate the maintenance and development of a TypeScript library. The Money Library provides precise financial calculation utilities while serving as a testbed for AI-assisted development workflows.

## Key Features

- **Money Operations**: Precise addition, subtraction, and comparison of monetary values
- **Currency Support**: Handling of different currency types
- **Decimal Precision**: Accurate calculations avoiding floating-point errors
- **Type Safety**: Full TypeScript support

## AI-Driven Development

This repository implements an automated workflow using n8n and AI agents that:

1. Responds to properly formatted GitHub issues
2. Creates a branch for the implementation
3. Implements requested features or fixes using Test-Driven Development
4. Updates documentation as needed
5. Creates pull requests
6. Handles semantic versioning and releases

## Documentation

- [Project Overview](docs/project-overview.md) - Overview of the Money Library project
- [Technical Specification](docs/technical-specification.md) - API and implementation details
- [AI Automation Guide](docs/ai-automation-guide.md) - How the n8n workflows and AI agents work
- [Contribution Guide](docs/contribution-guide.md) - How to contribute to the project
- [Style Guide](docs/style-guide.md) - Code style and development standards

## Getting Started

To get started with this project, you can:

1. Explore the documentation in the `/docs` directory
2. Create an issue using the provided templates to see the automation in action
3. Set up your own n8n instance following the guide in the AI Automation Guide

## Local Development Setup

### Setting up n8n with ngrok for GitHub Webhooks

To develop and test the GitHub automation workflows locally:

1. **Prerequisites:**

   - [Docker](https://docs.docker.com/get-docker/) and Docker Compose installed
   - An [ngrok account](https://ngrok.com/) and auth token
   - A GitHub account with a test repository

2. **Setup:**

   ```
   # Make the script executable if needed
   chmod +x init-dev-environment.sh

   # Run the initialization script
   ./init-dev-environment.sh
   ```

   This script handles:

   - Creating a `.env` file from the template if needed
   - Starting ngrok first to obtain a stable URL
   - Updating the environment with the current ngrok URL
   - Starting n8n with the correct webhook URL configuration
   - Verifying that all services are properly synchronized

3. **Configure GitHub Webhook:**

   - Use the URL provided by the initialization script output
   - Add a webhook in your GitHub repository settings:
     - Payload URL: The complete webhook URL from n8n
     - Content type: `application/json`
     - Events: Issues, Issue comments

   > **Note**: With a free ngrok plan, the URL changes every time you restart. Always use `./init-dev-environment.sh` to restart your environment, which ensures n8n and ngrok stay synchronized.

4. **Access the Services:**

   - n8n Editor: http://localhost:5678/
   - ngrok Dashboard: http://localhost:4040/

5. **Test the Setup:**
   - Create a new issue in your GitHub repository
   - Check n8n for the triggered workflow

For more detailed instructions, see [AI Automation Guide](docs/ai-automation-guide.md).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
