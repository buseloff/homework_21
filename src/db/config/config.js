require('dotenv/config');
module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "tododb",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "tododb",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: "postgres",
    database: "tododb",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
