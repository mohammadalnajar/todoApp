const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const todosRouter = require('./routes/todos');
const port = 9988;

const db = require('./db');
const collection = 'todo';

// set engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todos', todosRouter);

db.connect((err) => {
  if (err) {
    console.log('unable to connect to database');
    process.exit(1);
  } else {
    app.listen(port, () =>
      console.log(`Server started at http://localhost:${port}`)
    );
  }
});
