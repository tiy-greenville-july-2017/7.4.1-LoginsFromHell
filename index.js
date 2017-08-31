const models = require('./models');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

const checkPassword = (user, password) => {
  return user.password === password;
};

passport.use(new LocalStrategy((username, password, done) => {
  models.User.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    if (user === null) {
      done(null, false);
    } else if (user && checkPassword(user, password)) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.findById(id).then((user) => {
    done(null, user);
  });
});

app.use(passport.initialize());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get("/", (req, res) => {
  res.render('index');
})

app.get("/secret", passport.authenticate('local'), (req, res) => {
  res.send("SECRET");
});

app.listen(3000)
