const db = require('../db');
const { countCompleted } = require('../public/js/countCompleted');
module.exports = {
  getAllTodos: async function (req, res) {
    try {
      const documents = await db.getDB().collection('todos').find({}).toArray();
      const countObj = countCompleted(documents);
      console.log(documents);
      res.status(200).render('index', { documents, countObj });
    } catch (err) {
      console.log(err, 'catch in get all method');
      res.status(500).json({
        msg: 'Unfortunately there is something wrong with our server. ',
      });
    }
  },
  createTodo: async function (req, res) {
    const { todo, priority } = req.body;
    try {
      await db
        .getDB()
        .collection('todos')
        .insertOne({ todo, priority, done: false });
      const documents = await db.getDB().collection('todos').find({}).toArray();
      console.log(documents);
      res.status(201).json(documents);
    } catch (err) {
      console.log(err, 'catch in post method');
      res.status(500).json({
        msg: 'Unfortunately there is something wrong with our server. ',
      });
    }
  },
  updateTodo: async function (req, res) {
    const { id } = req.body;
    let updateObj = {};

    // getting ojb without id key
    for (const key in req.body) {
      if (key === 'id') {
        continue;
      } else {
        updateObj[key] = req.body[key];
      }
    }
    try {
      const result = await db
        .getDB()
        .collection('todos')
        .findOneAndUpdate(
          { _id: db.getPrimaryKey(id) },
          { $set: updateObj },
          { returnOriginal: false }
        );
      console.log(result.lastErrorObject, result.value);
      if (result.value === null) {
        res.status(404).json({ msg: `Todo with id: ${id} is not found` });
        return;
      }
      res.status(200).json({ msg: `Todo with id: ${id} is updated` });
    } catch (err) {
      console.log(err, 'catch in put method');
      res.status(500).json({
        msg: 'Unfortunately there is something wrong with our server. ',
      });
    }
  },
  deleteTodo: async function (req, res) {
    const { id } = req.body;
    try {
      const result = await db
        .getDB()
        .collection('todos')
        .findOneAndDelete({ _id: db.getPrimaryKey(id) });
      console.log(result.lastErrorObject, result.value);
      if (result.value === null) {
        res.status(404).json({ msg: `Todo with id: ${id} is not found` });
        return;
      }
      res.status(200).json({ msg: `Todo with id: ${id} is deleted` });
    } catch (err) {
      console.log(err, 'catch in delete method');
      res.status(500).json({
        msg: 'Unfortunately there is something wrong with our server. ',
      });
    }
  },
};
