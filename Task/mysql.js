const mysql = require('mysql2/promise');

class Mysql {
  /**
   * 接続
   * @param config({host, user, password, database, multipleStatements})
   * @returns {Promise}
   */
  async connect(config) {
    this.connection = await mysql.createConnection(config);
  }

  /**
   * クエリ実行
   * @param query
   * @param parameters
   * @returns {Promise}
   */
  async query(query, parameters = []) {
    return await this.connection.query(query, parameters);
  }

  /**
   * 終了
   * @returns {Promise}
   */
  async end() {
    await this.connection.end();
  }
}

module.exports = Mysql;
