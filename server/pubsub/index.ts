// import { PubSub } from "apollo-server";

// export const pubsub = new PubSub();

// TO START:
/**
```
GOOGLE_APPLICATION_CREDENTIALS=~/Desktop/gcp-keys/service-accounts/now-todos/publisher-dev/now-todos-subscriptions-1aedbee3ce85.json \
yarn workspace now-todos-server start
```
 */

import { GooglePubSub } from "@axelspringer/graphql-google-pubsub";
export const pubsub = new GooglePubSub();

export const Events = {
  TODO_ADDED: "todoAdded"
};

pubsub
  .publish("todoAdded", { foo: "baSSSSr" })
  .then((res: any) => {
    console.log("RES\n", res);
  })
  .catch((e: any) => console.log("EEEEEEEEEEEE", e));
