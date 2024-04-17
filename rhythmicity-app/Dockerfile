ARG NODE_VERSION

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["tail", "-f", "/dev/null"]