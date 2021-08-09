const { MongoClient, ObjectId } = require('mongodb');

const dbName = 'crud_mongodb';
const url = 'mongodb://localhost:27017';
const mongoOptions = { useNewUrlParser: true };

const state = {
  db: null,
};

const db = {
  connect: (cb) => {
    if (state.db) {
      cb();
    } else {
      MongoClient.connect(url, mongoOptions, (err, client) => {
        if (err) cb(err);
        else {
          state.db = client.db(dbName);
          cb();
        }
      });
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
