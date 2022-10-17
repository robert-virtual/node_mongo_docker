const { MongoClient } = require("mongodb");

const connection = new MongoClient(process.env.MONGO_URI);
const db = connection.db();

exports.getCollection = (name) => {
  return db.collection(name);
};
