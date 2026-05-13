import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "monetization";

if (!uri) {
  throw new Error("MONGODB_URI manquant dans les variables d'environnement");
}

let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri).connect();
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}

export async function getUsersCollection() {
  const db = await getDb();
  const collection = db.collection("users");
  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ accessToken: 1 }, { unique: true });
  return collection;
}
