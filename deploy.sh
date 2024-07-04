#!/bin/bash

# Variable name to check maintenance mode
ENV_VAR_NAME="MAINTENANCE_MODE"

# Check if the environment variable is set to "true"
if [[ "${!ENV_VAR_NAME}" = "true" ]]; then
  echo "Entering maintenance mode..."
  php artisan down
fi

# Install composer dependencies without dev dependencies
composer install --optimize-autoloader --no-dev

# Install node dependencies
npm i

# Clear cache
php artisan optimize:clear

# Set passport client key
php artisan passport:install

# Database migration
php artisan migrate --force

# Check if the environment variable is set to "false" or not set at all
if [[ "${!ENV_VAR_NAME}" = "false" ]] || [[ -z "${!ENV_VAR_NAME}" ]]; then
  echo "Exiting maintenance mode..."
  php artisan up
fi