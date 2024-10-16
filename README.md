# About

Rhythmicity is a music app where users can search for and listen to their favorite songs, follow the lyrics in real time, and control the playback queue with options such as repeat, shuffle, or repeat a single track. In addition to these features, the app handles authentication, data storage, microservices management, and integrates APIs and web scraping techniques to build its own database.

The app incorporates various concepts and technologies, including Golang, TypeScript, Protocol Buffers, certificates, message brokers, Nginx, an API gateway, microservices architecture, caching, Docker, and more.

I developed it inspired by a system design video lesson (unfortunately, the video is no longer available).

# Diagram

![Rhythmicity diagram](https://github.com/user-attachments/assets/56c4857c-e97a-43ce-a0eb-be431d3f7465)

# Instructions

Before proceeding, you will need some prerequisites: have docker installed, be able to execute commands with the make command, and be able to create certificates with openssl.

To get the entire app up and running:

- you will need to create the networks

```bash
make create-net
```

- you will need to have the data created by the generator. See the [generator instructions](https://github.com/nichol20/rhythmicity/blob/main/generate-db/README.md#how-to-use). And then you will have to distribute the data to the microservices so that they can run their respective scripts and populate the database.

```bash
make allocate-data
```

- you will need to get each application running. See the instructions for each application.<br/>
  **It is necessary to run rabbitmq before search-api and main-api, as they need rabbitmq running to initialize.**
