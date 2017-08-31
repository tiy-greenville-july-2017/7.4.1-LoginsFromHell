const models = require('./models');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.get("/", (req, res) => {
  res.send("you did it");
})

app.listen(3000)
