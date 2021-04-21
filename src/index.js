const { User, Task } = require("./db/models");
const bcrypt = require("bcrypt");
const { Sequelize, Op } = require("sequelize");
const moment = require("moment");

const getAllUsersWithTasks = async () => {
  try {
    await User.findAll({
      attributes: ["id", "firstName", "lastName", "email"],
      raw: true,
    }).then(async (usersArray) => {
      for (let i = 0; i < usersArray.length; i++) {
        console.log(
          `User ${usersArray[i].firstName} ${usersArray[i].lastName} ${usersArray[i].email} has the following tasks:`
        );
        await Task.findAll({
          attributes: ["userId", "value", "isDone"],
          raw: true,
          where: {
            userId: usersArray[i].id,
          },
        }).then((allTasks) => {
          if (allTasks)
            allTasks.map((userTask, index) =>
              console.log(
                `task ${index + 1}: ${userTask.value}, status: ${
                  userTask.isDone ? "done" : `not done (deadline ${moment(userTask.deadline).format('MMMM Do YYYY')}!!!)`
                }`
              )
            );
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const getTasksByUserId = async (inputId) => {
  try {
    await Task.findAll({
      include: {
        model: User,
        as: "owner",
        required: true,
      },
      where: {
        userId: {
          [Op.eq]: inputId
        },
      },
      raw: true,
    }).then(async (tasksArray) => {
      tasksArray.map((task, index) => {
        console.log(
          `Task №${index + 1} with title: ${
            task.value
          }, Status of performing: ${task.isDone ? "done" : `not done (deadline ${moment(task.deadline).format('MMMM Do YYYY')}!!!)`} by ${
            task["owner.firstName"]
          } ${task["owner.lastName"]}`
        );
      });
    });
  } catch (e) {
    console.log(e);
  }
};
//Вызов такой по причине асинхронности, чтобы не смешивать результаты работы функций
getAllUsersWithTasks().then(() => getTasksByUserId(3)).then(() => console.log("Functions finished working!"));





/*
User.create({
  firstName: "Test",
  lastName: "Test",
  email: "test@gmail.com",
}).then(console.log);

User.findByPk(1).then(console.log);
const fun_hash_passw = async (password) => {
  try {
    return bcrypt.hash(password, 10);
  } catch (e) {
    throw e;
  }
};

const createUser = async (data) => {
  try {
    data.passwordHash = await fun_hash_passw(data.password);
    const createUser = await User.create(data);
    return createUser;
  } catch (e) {
    throw e;
  }
};

createUser({
  firstName: "Name101",
  lastName: "Surname101",
  email: "email101@gmail.com",
  login: "userlogin101",
  password: "qwerty",
})
  .then(console.log)
  .catch(console.err);

const getUserById = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (e) {
    throw e;
  }
};

getUserById(80).then(console.log).catch(console.err);

const updateUser = async (update_data, condition) => {
  try {
    await User.update(update_data, {
      where: condition,
    });
  } catch (e) {
    throw e;
  }
};

updateUser({ lastName: "Peterson" }, { lastName: "Surname1" })
  .then(console.log)
  .catch(console.err);
const deleteUser = async (condition) => {
  try {
    await User.destroy({
      where: condition,
    });
  } catch (e) {
    throw e;
  }
};

deleteUser({ lastName: "Peterson" });
const { gt, lte, ne, in: opIn } = Sequelize.Op;

User.findAll({
  where: {
    id: {
      [gt]: 80,
    },
  },
})
  .then(console.log)
  .catch(console.err);
User.findAll(
  {
    where: {
      id: {
        [gt]: 80,
      },
    },
    raw: true,
  }
)
  .then(console.log)
  .catch(console.err);*/
