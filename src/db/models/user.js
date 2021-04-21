"use strict";
//const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      login: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
    },
    {}
  );

  User.associate = function (models) {
    User.hasMany(models.Task, {
      foreignKey: {
        field: "userId",
      },
      as: "tasks",
    });
  };

  return User;
};
