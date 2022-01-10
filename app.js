const mysql = require('mysql2/promise');
require('dotenv').config();
const env = process.env;

const db_config_old = {
  host: env.DB_HOST_OLD,
  database: env.DB_DATABASE_OLD,
  user: env.DB_USERNAME_OLD,
  password: env.DB_PASSWORD_OLD,
};
const db_config_new = {
  host: env.DB_HOST_NEW,
  database: env.DB_DATABASE_NEW,
  user: env.DB_USERNAME_NEW,
  password: env.DB_PASSWORD_NEW,
};

exports.lambdaHandler = async (event) => {
  console.log(env.TEST);
  const connection_old = await mysql.createConnection(db_config_old);
  const connection_new = await mysql.createConnection(db_config_new);

  let sql = 'SELECT name, status FROM dumy';
  let data = await db_select(connection_old, sql);
  for (value of data) {
    console.log(value);
    await db_insert(connection_new, 'dumy', value);
  }

  sql = 'SELECT * FROM dumy';
  data = await db_select(connection_new, sql);
  console.log(data);

  connection_old.end();
  connection_new.end();
  return { statusCode: 200, body: JSON.stringify('Hello from Lambda!') };
};

// データ追加
async function db_insert(connect, tablename, data) {
  let sql = 'insert into ' + tablename + ' set ?';
  const [rows] = await connect.query(sql, data);
  return rows.insertId;
}

// データ参照
async function db_select(connect, sql) {
  const [results, field] = await connect.execute(sql);
  return results;
}
