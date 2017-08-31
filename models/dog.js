'use strict';
module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define('Dog', {
    name: DataTypes.STRING,
    isWearingHat: DataTypes.BOOLEAN,
    isAggressive: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  });

  Dog.associate = (models) => {
    Dog.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Dog;
};
