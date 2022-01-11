require('dotenv').config();
const env = process.env;

exports.old = {
  host: env.DB_HOST_OLD,
  user: env.DB_USERNAME_OLD,
  password: env.DB_PASSWORD_OLD,
  database: env.DB_DATABASE_OLD,
  multipleStatements: true,
};
exports.new = {
  host: env.DB_HOST_NEW,
  user: env.DB_USERNAME_NEW,
  password: env.DB_PASSWORD_NEW,
  database: env.DB_DATABASE_NEW,
  multipleStatements: true,
};
