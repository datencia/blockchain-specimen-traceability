#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <project_name>"
  exit 1
fi

PROJECT=$1
CURRENT_PATH=$(pwd)
PROJECT_PATH="$CURRENT_PATH/$PROJECT"
ENV_FILE="$PROJECT_PATH/.env"
ENV_EXAMPLE_FILE="$PROJECT_PATH/.env.example"

if [ ! -d "$PROJECT_PATH" ]; then
  echo "The project '$PROJECT' does not exist in the repository."
  exit 1
fi

if [ ! -f "$ENV_EXAMPLE_FILE" ]; then
  echo "The .env.example file does not exist in the project '$PROJECT'."
  exit 1
fi

cp "$ENV_EXAMPLE_FILE" "$ENV_FILE"

chmod 600 "$ENV_FILE"

echo "The .env file has been initialized for the project '$PROJECT'."
