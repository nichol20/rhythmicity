# About

This is a music app that I made inspired by a system design video lesson (the video is no longer available). It uses several concepts and technologies, such as golang, typescript, protocol buffers, certificates, message broker, nginx, api-gateway, microservices, caching, docker among others.

# Diagram

![Rhythmicity diagram](https://github.com/user-attachments/assets/56c4857c-e97a-43ce-a0eb-be431d3f7465)

# Instructions

Before proceeding, you will need some prerequisites: have docker installed, be able to execute commands with the make command, and be able to create certificates with openssl.

To get the entire app up and running:

- you will need to create the networks

```bash
make create-net
```

- you will need to have the data created by the generator. See the [generator instructions](<!-- TODO: Add Link -->). And then you will have to distribute the data to the microservices.

```bash
make allocate-data
```

- you will need to get each application running. See the instructions for each application.<br/>
  **It is necessary to run rabbitmq before search-api and main-api, as they need rabbitmq running to initialize.**
