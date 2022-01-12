const Mysql = require('./src/mysql');
const Database = require('./src/config/database');

exports.lambdaHandler = async (event) => {
  const mysqlOld = new Mysql();
  const mysqlNew = new Mysql();
  await mysqlOld.connect(Database.old);
  await mysqlNew.connect(Database.new);

  let sql = `SELECT name, status FROM dumy limit 5;`;
  let [data] = await mysqlOld.query(sql);

  for (value of data) {
    //await mysqlNew.query('replace into dumy set ?;', value);
  }
  [data] = await mysqlNew.query(sql);

  var check = data.some((value) => value['name'] === 'pp');
  console.log(check);

  await mysqlOld.end();
  await mysqlNew.end();
  return { statusCode: 200, body: JSON.stringify('Hello from Lambda!') };
};
