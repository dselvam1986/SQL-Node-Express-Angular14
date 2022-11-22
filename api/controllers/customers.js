const dbConnection = require('../db');

const storeObj = dbConnection.find((db) => {
  if (db.name === 'sql_store') return db;
});

const storeConnection = storeObj.connection;
const tableName = storeObj.name;

const getCustomer = (req, res) => {
  storeConnection.query('SELECT * FROM customers', (err, data) => {
    if (err) {
      console.log('error: ', err);
      return;
    }
    res.status(200).json(data);
  });
};

const insertCustomer = (req, res) => {
  const { first_name, last_name, birth_date, phone, address, city, state, points } = req.body;

  var sql = 'INSERT INTO ' + tableName + '.customers (first_name,last_name,birth_date,phone,address,city,state,points)VALUES(?,?,?,?,?,?,?,?)';
  storeConnection.query(sql, [first_name, last_name, birth_date, phone, address, city, state, points], (err, data) => {
    if (err) {
      console.log('error: ', err);
      return;
    }
    res.status(200).json(data);
  });
};

const updateCustomer = (req, res) => {
  console.log(req.body);
  var items = req.body;
  var { id } = req.params;
  var sql = 'UPDATE ' + tableName + '.customers SET ';

  var keys = Object.keys(items);

  keys.forEach((key, index) => {
    sql += index === 0 ? '' + key + '=?' : ',' + key + '=?';
  });
  //WHERE
  sql += ' WHERE ( customer_id=' + Number(id) + ')';
  var values = Object.values(items);

  console.log(sql);
  storeConnection.query(sql, values, (err, data) => {
    if (err) {
      console.log('error: ', err);
      return;
    }
    res.status(200).json(data);
  });
};

const deleteCustomer = (req, res) => {
  const { id } = req.params;

  storeConnection.query('DELETE FROM customers WHERE customer_id=?', id, (err, data) => {
    if (err) {
      console.log('error: ', err);
      return;
    }
    res.status(200).json(data);
  });
};

module.exports = { getCustomer, insertCustomer, updateCustomer, deleteCustomer };
