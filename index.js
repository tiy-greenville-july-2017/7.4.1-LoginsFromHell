const models = require('./models');

models.User.findOne({
  where: {username: "ASLKDJASLKDJASLKDJAKLSJD"}
}).then((user) => {
  let newDog = models.Dog.build({
    name: "Tom",
    isWearingHat: true,
    isAggressive: false
  });

  // If user is found, create dog with user
  // If user is not found, create dog without user.
  if (user !== null) {
    newDog.userId = user.id;
  }
  newDog.save();
});
