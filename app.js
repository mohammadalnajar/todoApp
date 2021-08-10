const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const todosRouter = require('./routes/todosRouter');
const port = 9988;

const db = require('./db');
const collection = 'todos';

// set engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  router todos
app.use('/todos', todosRouter);

db.connect((err) => {
  if (err) {
    console.log(err, 'unable to connect to database');
    process.exit(1);
  } else {
    app.listen(port, () =>
      console.log(`Server started at http://localhost:${port}`)
    );
  }
});
