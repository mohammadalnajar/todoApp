const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  await db
    .getDB()
    .collection('todos')
    .find({})
    .toArray((err, documents) => {
      if (err) console.log(err);
      else {
        console.log(documents);
        res.json(documents);
      }
    });
});

router.post('/', async (req, res) => {
  const { todo } = req.body;
  await db.getDB().collection('todos').insertOne({ todo: todo });
  await db
    .getDB()
    .collection('todos')
    .find({})
    .toArray((err, documents) => {
      if (err) console.log(err);
      else {
        console.log(documents);
        res.json(documents);
      }
    });
});
module.exports = router;
