import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "localhost:27017";
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    //connection string do banco (url/usuario/senha)
    const client = new Mongo(url, { auth: { username, password } });
    //nome do banco que possui as collections
    const db = client.db("test");

    this.client = client;
    this.db = db;

    console.log("connected to mongodb atlas");
  },
};
