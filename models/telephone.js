'use strict';
module.exports = function(sequelize, DataTypes) {
  var Telephone = sequelize.define('Telephone', {
    name: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Telephone.belongsTo(models.User);
      }
    }
  });
  return Telephone;
};
