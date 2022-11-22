const dbConnection = require('../db');

const hrObj = dbConnection.find((db) => {
  if (db.name === 'sql_hr') return db;
});

const heConnection = hrObj.connection;
const tableName = hrObj.name;

const getEmployee = (req, res) => {
  heConnection.query('SELECT * FROM employees', (err, data) => {
    if (err) {
      console.log('error: ', err);
      return;
    }
    res.status(200).json(data);
  });
};

const createEmployee = (req, res) => {
  const { first_name, last_name, job_title, salary, reports_to, office_id } = req.body;

  var sql = 'INSERT INTO ' + tableName + '.employees (first_name,last_name,job_title,salary,reports_to,office_id)VALUES(?,?,?,?,?,?)';
  heConnection.query(sql, [first_name, last_name, job_title, salary, reports_to, office_id], (err, data) => {
    if (err) {
      console.log('error: ', err);
      return;
    }
    res.status(200).json(data);
  });
};

const updateEmployee = (req, res) => {
  console.log(req.body);
  var items = req.body;
  var { id } = req.params;
  var sql = 'UPDATE ' + tableName + '.employees SET ';

  var keys = Object.keys(items);

  keys.forEach((key, index) => {
    sql += index === 0 ? '' + key + '=?' : ',' + key + '=?';
  });
  //WHERE
  sql += ' WHERE ( employee_id=' + Number(id) + ')';
  var values = Object.values(items);

  console.log(sql);
  heConnection.query(sql, values, (err, data) => {
    if (err) {
      console.log('error: ', err);
      return;
    }
    res.status(200).json(data);
  });
};

const deleteEmployee = (req, res) => {
  const { id } = req.params;

  heConnection.query('DELETE FROM employees WHERE employee_id=?', id, (err, data) => {
    if (err) {
      console.log('error: ', err);
      return;
    }
    res.status(200).json(data);
  });
};

module.exports = { getEmployee, createEmployee, updateEmployee, deleteEmployee };
