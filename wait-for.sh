#!/bin/bash

while ! docker-compose logs mysql | grep "ready for connections"; do
  echo "Waiting for initdb to complete..."
  sleep 1
done