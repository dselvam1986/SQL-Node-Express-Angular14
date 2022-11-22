const mysql = require('mysql2');
const dotenv = require('dotenv').config({ path: './config/.env' });

const databasesList = ['sql_hr', 'sql_inventory', 'sql_invoicing', 'sql_store'];
const dbConnection = [];

// /**DB Connections */
databasesList.forEach((db) => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: db,
    port: process.env.DB_PORT,
  });

  connection.connect((err) => {
    if (err) {
      throw err;
    }
    console.log(`MySql Connected: ${connection.config.database}`);
  });

  let dbObj = {
    name: db,
    connection: connection,
  };

  dbConnection.push(dbObj);
});

module.exports = dbConnection;
