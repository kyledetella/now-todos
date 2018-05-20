# now-todo

A GraphQL service..._TBD_

# Todo

- [x] Create server using apollo-server 2.0
- [x] deploy on [now.sh](now.sh)
- [x] Add logging (morgan?)
- [ ] Add schema linting (https://github.com/cjoudrey/graphql-schema-linter)
- [ ] Introduce [graphql-import](https://github.com/prismagraphql/graphql-import) (and decomp schema)
- [ ] Add constraint directives (https://github.com/confuser/graphql-constraint-directive)
- [x] Add Engine/optics
- [ ] Add tests
- [ ] migrate server to typescript
- [ ] Introduce yarn workspaces and create a monorepo (for server and client)
- [ ] apollo-client
- [ ] relay client

# Development

**Note:** You will need to obtain an Apollo Engine API Key. Read more on [Apollo Engine here](https://www.apollographql.com/docs/engine/setup-node.html).

```
APOLLO_ENGINE_KEY=<APOLLO_ENGINE_KEY> yarn && yarn start
```

# Deployment

## [now](https://zeit.co/now)

### Add secrets

```
now secrets add apollo-engine-key <APOLLO_ENGINE_KEY>
```

### Deploy

```
now -e APOLLO_ENGINE_KEY=@apollo-engine-key
```
