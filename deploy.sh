#!/bin/bash

# Install composer dependencies without dev dependencies
composer install --optimize-autoloader --no-dev

# Install node dependencies
npm i

# Clear cache
php artisan optimize:clear

# Set passport client key
php artisan passport:install

# Database migration
php arisan migrate --force