# Travel Planner

This application uses Docker for development and deployment purposes.

## How to start (standing on the project root folder)

1. You need to copy the `.docker/.env.example` file into the `.docker` directory and name it `.env`. This file will
contain all configurations for Docker containers.
2. For local development and testing purposes you need to start Docker services by this command:
```bash
(cd .docker; source .env; docker compose up --build)
```
3. After the containers are up and ready you can reach the application on [8081 port of localhost](http://localhost:8081).

## Running on ARM machine

If you would like to run this project on an ARM based machine, you need to replace the database container source image
(in `.docker/database/.image/Dockerfile`) from
```dockerfile
FROM mysql:8.0.34-debian AS base
```
to
```dockerfile
FROM mysql:8.0.34-oracle AS base
```
since building the debian image will throw error and results in failing to build the container. 
