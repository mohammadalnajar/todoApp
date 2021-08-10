const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({ path: './config/.env' });
const dbName = 'todoApp';
const url = process.env.DATABASE_URL;
const mongoOptions = { useNewUrlParser: true };
const client = new MongoClient(url);
const state = {
  db: null,
};

const db = {
  connect: async (cb) => {
    if (state.db) {
      cb();
    } else {
      try {
        await client.connect();
        state.db = client.db(dbName);
        cb();
      } catch (err) {
        cb(err);
      }
    }
  },

  getPrimaryKey: (_id) => {
    return ObjectId(_id);
  },
  getDB: () => {
    return state.db;
  },
};
module.exports = db;
