import { MongoClient, Db } from "mongodb";

interface IDBConfig {
  name: string;
  password: string;
  user: string;
}

export const initializeDB = ({
  user,
  name,
  password
}: IDBConfig): Promise<Db> => {
  const MONGO_URL = `mongodb://${user}:${password}@ds241570.mlab.com:41570/${name}`;

  return new Promise((resolve, reject) => {
    MongoClient.connect(
      MONGO_URL,
      { loggerLevel: "info" },
      async (err, client) => {
        if (err) {
          return reject(err);
        }

        resolve(client.db(name));
      }
    );
  });
};
