<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

It is a small and simple example of using [Nest](https://github.com/nestjs/nest) framework and GraphQL with subsocial API.
This app is prepared to be run with the help of docker (you will see a multi-staging build realized in dockerfile).

## Requirements

You should have at least node v16.6.2. Also, all configuration variables are stored in .env.app-config.local file. Please, use your own IPFS_AUTH_TOKEN value (IPFS authorization token).

## Manual test

You can play with an app via playground (it is available on http://localhost:5000/playground).

## Important notes

Each post has a relation with its owner.
That's why the owner should be created first.

Also, there is a dump with a small data portions for tests (installed automatically during docker compose up)
Enjoy :)

#### Post owner (author) creation sample
```
mutation {
  createOwner(input: { 
    ownerId: "3rGZ2cUTaCHWgG6z3UL8nFsWvUBt1K5CEeoMXTUVFL2GCZ8q"
    nickname: "Vasyl",
  }) {
    id,
    ownerId,
    nickname,
    createdAtTime,
    updatedAtTime
  }
}
```

#### Post creation sample
```
mutation {
  createPost(input: { 
    spaceId: "1", 
    ownerId: "3rGZ2cUTaCHWgG6z3UL8nFsWvUBt1K5CEeoMXTUVFL2GCZ9q",
    content: {
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABfQAAAKaCAYAAAB4Gdi/AAAgAElEQVR4XuydB7QVxdZuS0URRTEHUAwgK",
        body: "Just some test body",
        title: "Just some test title",
        tags: ["first_tag", "second_tag"],
      
    }
  }) {
    spaceId,
    image,
    tags,
    title,
    id,
    body,
    syncedBlock,
    syncedContentId
  }
}
```

#### Find post owners (authors) sample
```
query {
  findOwners(filter: {}, paging: { limit: 10, offset: 0}) {
    node {
      id,
      ownerId,
      nickname,
      createdAtTime,
      updatedAtTime
    },
    totalCount
  }
}
```

#### Find posts sample
```
query {
  findPosts(filter: {}, paging: { limit: 10, offset: 0}) {
    node {
      spaceId,
      image,
      tags,
      title,
      id,
      body,
      syncedBlock,
      syncedContentId
    },
    totalCount
  }
}
```

## Installation

## Running the app in docker.
#### Just use a command below, all job will be made automatically.

```bash
$ docker compose --env-file .env.app-config.local up
```

## Local run without a docker
#### If you want to run this app on your local machine without docker, you need to comment app container inside docker-compose.yaml file. As well as "network" for db container.
#### Also, use next variable values for .env.app-config.local file -> DB_HOST=localhost and DB_PORT=6000
#### Run next command to install packages (there are some very important packages which had some dependency conflicts with new versions of nestjs packages).

```bash
$ npm install
```

## Run next command in case of any issues during npm install

```bash
$ npm install --legacy-peer-deps
```

## Test (not fully covered yet)

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Things to be added/improved:
#### 1. Need to add some kind of authentication/authorization process for posts owners (authors)
#### 2. Need to archive a full coverage by unit tests.
#### 3. It would be good idea to implement a mechanism to upload all images to some service E.g. minio and return to FE a link to CDN with image instead of base64.
#### 4. It would be good to implement some FE part for this app.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
