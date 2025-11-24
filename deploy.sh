#!/bin/bash

# Automated Deployment Script for Pizza Front-End
# This script is triggered by GitHub webhook on push to master

set -e  # Exit on any error

PROJECT_DIR="/home/neo/deploy-projects/pizza-house/pizza-front-end"
LOG_FILE="$PROJECT_DIR/deploy.log"

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "========== Starting Deployment =========="

# Navigate to project directory
cd "$PROJECT_DIR"

# Pull latest changes from master
log "Pulling latest changes from master branch..."
git fetch origin master
git reset --hard origin/master

# Install dependencies
log "Installing dependencies..."
yarn install --frozen-lockfile

# Build the project
log "Building the project..."
yarn build

# Restart the application (if using a process manager like PM2)
# Uncomment and modify based on your setup:
# pm2 restart pizza-front-end

# If using systemd service, uncomment:
# sudo systemctl restart pizza-front-end

# If serving with a simple HTTP server
if command -v pm2 &> /dev/null; then
    log "Restarting application with PM2..."
    pm2 restart pizza-front-end || pm2 start yarn --name pizza-front-end -- start
else
    log "Build completed. Please restart your web server manually."
fi

log "========== Deployment Completed Successfully =========="
