# now-todo

[![CircleCI](https://circleci.com/gh/kyledetella/now-todos/tree/master.svg?style=svg)](https://circleci.com/gh/kyledetella/now-todos/tree/master)

A GraphQL service..._TBD_

Latest version(s) deployed to:

* server: [https://now-todos-server.now.sh/graphql](https://now-todos-server.now.sh/graphql)
* client: [https://now-todos-client.now.sh](https://now-todos-client.now.sh)

# Todo

## General

- [ ] Introduce subscriptions/live queries
- [ ] Leverage schema-stitching and implement 3rd party GQL API
- [ ] Add ESLint
- [ ] Use apollo-codegen to generate TS defs (+ try out Flowtype defs)
- [ ] Add users and auth
- [x] Add ability to delete todos
  - [x] Server
  - [x] Client
- [x] Remove unused client dir
- [ ] dockerize app
- [ ] relay server/client

## Server

- [x] Create server using apollo-server 2.0
- [x] deploy on [now.sh](now.sh)
- [x] Add logging (morgan?)
- [x] Add schema linting (https://github.com/cjoudrey/graphql-schema-linter)
- [x] Hook up to CI
- [x] Add tests
- [x] Introduce [graphql-import](https://github.com/prismagraphql/graphql-import) (and decomp schema for merge)
- [ ] Add constraint directives (https://github.com/confuser/graphql-constraint-directive)
- [ ] Add role-based schema limiting
- [x] Add Engine/optics
- [x] migrate server to typescript
- [ ] Explore using [ts-jest](https://github.com/kulshekhar/ts-jest)
- [x] Introduce yarn workspaces and create a monorepo (for servers and client)
- [x] Add gql2ts

## Client

- [x] Introduce apollo-client
- [x] Add typescript to client
- [x] Deploy TS client on `now`
- [x] Get tests running on CI
- [ ] Add proper tests

# Development

## Server

### Environment variables

Add the following to a `.env` file in `/server`:

```
APOLLO_ENGINE_KEY=<APOLLO_ENGINE_KEY>
DB_USER=<DB_USERNAME>
DB_PASSWORD=<DB_PASSWORD>
DB_NAME=<DB_NAME>
```

#### Apollo Engine

You will need to obtain an Apollo Engine API Key. Read more on [Apollo Engine here](https://www.apollographql.com/docs/engine/setup-node.html).

#### mlab

This project is structured to connect to a mongodb database using [mlab.com](mlab.com)

**Dependencies**

This project uses [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to create a monorepo. To install dependencies, run `yarn` from the root.

**Run server:**

```
cd server && yarn start
```

**Run client:**

```
cd client && yarn start
```

**Run both from root:**

```
yarn start
```

# Deployment

## Server

### [now](https://zeit.co/now)

#### Add secrets

```
now secrets add apollo-engine-key <APOLLO_ENGINE_KEY>
```

#### Deploy

```
yarn deploy-server
```

## Client

### Deploy statically to [now](https://zeit.co/now)

```
yarn deploy client
```

# Generating Types

You can generate Typescript definitions from the GraphQL schema using [gql2ts](https://github.com/avantcredit/gql2ts)

```
yarn workspace server generate-types
```