#!/bin/bash

# Pull the latest client and server images
docker pull 088044628795.dkr.ecr.ap-southeast-1.amazonaws.com/s34-client:latest
docker pull 088044628795.dkr.ecr.ap-southeast-1.amazonaws.com/s34-server:latest

# Remove existing containers
docker rm -f client-container
docker rm -f server-container

# Run new containers
docker run -d -p 3000:3000 --name client-container 088044628795.dkr.ecr.ap-southeast-1.amazonaws.com/s34-client:latest
docker run -d -p 8080:8080 --name server-container 088044628795.dkr.ecr.ap-southeast-1.amazonaws.com/s34-server:latest