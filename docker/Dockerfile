FROM node:14.21.1-alpine AS build

RUN apk update && apk add --no-cache netcat-openbsd && apk add bash

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build

COPY wait-for.sh ./
RUN chmod +x wait-for.sh

# It is a small try to wait for a mysql container to be ready before app.
ENTRYPOINT [ "/bin/bash", "-c" ]
CMD ["wait-for.sh"]


FROM node:14.21.1-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY --chown=node:node --from=build /usr/src/app/dist ./dist

RUN touch schema.gql
RUN chown -R node:node schema.gql

USER node
CMD node dist/src/main