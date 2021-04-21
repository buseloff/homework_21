"use strict";
//const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      isDone: DataTypes.BOOLEAN,
      value: DataTypes.STRING,
      deadline: {
        type: DataTypes.DATE,
        validate: {
          isAfter: new Date(),
        },
      },
    },
    {}
  );

  Task.associate = function (models) {
    Task.belongsTo(models.User, {
      foreignKey: {
        field: "userId",
      },
      as: "owner",
    });
  };
  return Task;
};
