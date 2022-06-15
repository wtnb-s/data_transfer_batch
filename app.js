const Mysql = require('./src/mysql');
const Database = require('./src/config/database');

exports.lambdaHandler = async (event) => {
  const mysqlOld = new Mysql();
  const mysqlNew = new Mysql();
  await mysqlOld.connect(Database.old);
  await mysqlNew.connect(Database.new);

  let sql = `SELECT id, name, type FROM test;`;
  let [data] = await mysqlOld.query(sql);

  let save = [];
  for (value of data) {
    value['type'] = 9;
    value['sort'] = null;
    value['id'] = value['id'] + 1000;
    save.push(value);
    // Object.value(value)
  }

  console.log(save.map((item) => [item.id, item.name, item.type, item.sort, item.created_at, item.updated_at]));
  await mysqlNew.query('REPLACE INTO test (id, name, type, sort, created_at, updated_at) VALUES ?;', [
    save.map((item) => [item.id, item.name, item.type, item.sort, item.created_at, item.updated_at]),
  ]);

  await mysqlOld.end();
  await mysqlNew.end();
  return { statusCode: 200, body: JSON.stringify('done') };
};
