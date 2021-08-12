const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
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
app.use(express.static('public'));
//  router todos
app.use('/todos', todosRouter);
hbs.handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
app.get('/', (req, res) => {
  res.render('index');
});
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
