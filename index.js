const models = require('./models');

models.Dog.findOne({
  where: {name: "Tom"}
}).then((dog) => {
  models.User.findOne({
    where: {username: "joel"}
  }).then((user) => {
    dog.userId = user.id;
    dog.save();
  });
});
