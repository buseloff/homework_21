"use strict";
const bcrypt = require("bcrypt");

function generate_users_seed() {
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push({
      firstName: `Name${i}`,
      lastName: `Surname${i}`,
      email: `email${i}@gmail.com`,
      login: `userlogin${i}`,
      passwordHash: bcrypt.hashSync(`password${i}`, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
      profilePicture: `profilePicture${i}`,
    });
  }
  return users;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", generate_users_seed(), {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
