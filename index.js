const models = require('./models');

models.User.findOne({
  where: {username: "joel"},
  include: [models.Dog]
}).then((user) => {
  console.log(user.Dogs);
});
