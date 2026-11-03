FROM php:8.4-cli-alpine

ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo_pgsql pgsql intl zip bcmath opcache pcntl redis gd exif

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html
