# now-todo

[![CircleCI](https://circleci.com/gh/kyledetella/now-todos/tree/master.svg?style=svg)](https://circleci.com/gh/kyledetella/now-todos/tree/master)

A GraphQL service..._TBD_


# Todo

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
- [ ] Introduce subscriptions
- [ ] Add gql2ts
- [ ] apollo-client
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
