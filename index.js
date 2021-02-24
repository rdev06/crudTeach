const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const app = express();

//middlewares of mongoose

mongoose.connect('mongodb://localhost/crud', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

// for successful connection

db.once('open', () => console.log('connected to MongoDB successfully!!!'));

//for error in connection
db.on('error', err => console.log(err));

// // Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cors
app.use(cors());

app.use('/api', routes);
app.get('/', (req, res) => res.send('Hello world'));

app.listen(8080, () => console.log('server is up at port 8080'));
