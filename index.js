const models = require('./models');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

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

app.use(session({
  secret: 'i am a banana',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const requireLogin = (req, res, next) => {
  if (req.user !== null) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/secret", requireLogin, (req, res) => {
  res.send("SECRET");
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/'
}));

app.listen(3000)
