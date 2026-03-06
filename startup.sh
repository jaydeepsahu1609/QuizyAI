#!/bin/bash

if [ ! -f .env ]; then
    echo ".env file is not present in the system"
    echo "cp .env.template .env"
    echo "then update the SECRET_API_KEY value in that file and try again."
    exit 1
fi

export $(grep -v '^#' .env | xargs)

./mvnw spring-boot:run