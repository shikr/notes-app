#!/bin/sh

echo "Starting database migrations..."
npx drizzle-kit push

if [ $? -eq 0 ]; then
  echo "Migrations completed successfully. Starting the server..."
  npm start
else
  echo "Migrations failed. Server not started."
  exit 1
fi