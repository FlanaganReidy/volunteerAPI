'use strict';
const bcrypt = require('bcryptjs')
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  },{
    instanceMethods: {
        generateHash: function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        },
        validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        },
    }
});
  return User;
};
