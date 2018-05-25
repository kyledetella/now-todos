# now-todo

[![CircleCI](https://circleci.com/gh/kyledetella/now-todos/tree/master.svg?style=svg)](https://circleci.com/gh/kyledetella/now-todos/tree/master)

A GraphQL service..._TBD_


# Todo

## General

- [ ] dockerize app
- [ ] Introduce subscriptions/live queries
- [ ] Leverage schema-stitching and implement 3rd party GQL API

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
- [x] Introduce yarn workspaces and create a monorepo (for server and client)
- [x] Add gql2ts

## Client

- [x] Introduce apollo-client
- [x] Add typescript to client
- [x] Deploy TS client on `now`
- [ ] relay client

# Development

## Server

**Note:** You will need to obtain an Apollo Engine API Key. Read more on [Apollo Engine here](https://www.apollographql.com/docs/engine/setup-node.html).

Add the following to a `.env` file in `/server`:

```
APOLLO_ENGINE_KEY=<APOLLO_ENGINE_KEY>
```

Or provide the `APOLLO_ENGINE_KEY` environment variable when starting the server.

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
yarn deploy ts-client
```

# Generating Types

You can generate Typescript definitions from the GraphQL schema using [gql2ts](https://github.com/avantcredit/gql2ts)

```
yarn workspace now-todos-server generate-types
```