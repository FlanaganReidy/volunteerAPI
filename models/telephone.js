'use strict';
module.exports = function(sequelize, DataTypes) {
  var telephone = sequelize.define('telephone', {
    name: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return telephone;
};