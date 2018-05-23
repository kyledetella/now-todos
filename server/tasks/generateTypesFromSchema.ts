import * as fs from "fs";
import * as path from "path";
import { generateNamespace } from "@gql2ts/from-schema";
import { importSchema } from "graphql-import";

const schema = importSchema(
  path.resolve(__dirname, "../graphql/schema.graphql")
);
const namespace = generateNamespace("NowTodosGQL", schema);

fs.writeFile(
  path.resolve(__dirname, "../types/graphql.d.ts"),
  namespace,
  err => {
    if (err) {
      return console.log("Error generating types", err);
    }

    console.log("Types generated!");
  }
);
