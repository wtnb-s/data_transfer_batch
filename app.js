const Mysql = require('./Task/mysql');
const Database = require('./Task/config/database');

exports.lambdaHandler = async (event) => {
  const mysqlOld = new Mysql();
  await mysqlOld.connect(Database.old);
  [data] = await mysqlOld.query('SELECT name, status FROM dumy limit 3;');
  console.log(data);
  await mysqlOld.end();

  // const connection_old = await mysql.createConnection(db_config_old);
  // const connection_new = await mysql.createConnection(db_config_new);

  // let sql = 'SELECT name, status FROM dumy';
  // let data = await db_select(connection_old, sql);
  // for (value of data) {
  //   console.log(value);
  //   //await db_insert(connection_new, 'dumy', value);
  // }

  // sql = 'SELECT * FROM dumy';
  // data = await db_select(connection_new, sql);
  // console.log(data);

  // connection_old.end();
  // connection_new.end();
  return { statusCode: 200, body: JSON.stringify('Hello from Lambda!') };
};

// // データ追加
// async function db_insert(connect, tablename, data) {
//   let sql = 'insert into ' + tablename + ' set ?';
//   const [rows] = await connect.query(sql, data);
//   return rows.insertId;
// }

// // データ参照
// async function db_select(connect, sql) {
//   const [results, field] = await connect.execute(sql);
//   return results;
// }
