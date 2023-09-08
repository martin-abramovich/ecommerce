require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER = "root",
    "password": process.env.DB_PASSWORD = null,
    "database": process.env.DB_DATABASE = "galante",
    "host": process.env.DB_HOST= "127.0.0.1",
    "port": process.env.DB_PORT = "3306",
    "dialect": process.env.DB_DIALECT = "mysql"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT
  }
}