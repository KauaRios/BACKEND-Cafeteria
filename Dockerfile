FROM php:8.2-apache


# Ela atualiza os pacotes do Linux (Debian) para as versões mais seguras
RUN apt-get update && apt-get upgrade -y && apt-get clean

RUN docker-php-ext-install pdo pdo_mysql
RUN a2enmod rewrite