const dbConnection = require('../db');

const sql_hr = dbConnection.find((db) => {
  if (db.name === 'sql_hr') return db;
}).connection;

const hrConnection = hrObj.connection;
const hrName = hrObj.name;

const getEmployee = (req, res) => {
  sql_hr.query('SELECT * FROM employees', (err, data) => {
    if (err) res.status(400).json(err);

    res.status(200).json({ success: true, data: data });
  });
};

const createEmployee = (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  if (!name) {
    return res.status(400).json({ success: false, msg: 'please provide name value' });
  }
  res.status(200).send({ success: true, person: name });
};

const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((people) => people.id === Number(id));
  if (!person) {
    return res.status(404).json({ success: false, msg: `Person with id ${id} does not exist` });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).send({ success: true, data: newPeople, msg: `Value changed: ${id} - ${name}` });
};

const deleteEmployee = (req, res) => {
  const { id } = req.params;

  const person = people.find((people) => people.id === Number(id));
  if (!person) {
    return res.status(404).json({ success: false, msg: `Person with id ${id} does not exist` });
  }

  const newPeople = people.filter((person) => {
    if (person.id !== Number(id)) {
      return person;
    }
  });

  res.status(200).json({ success: true, data: newPeople });
};

module.exports = { getEmployee, updateEmployee, createEmployee, deleteEmployee };

// function PeopleController() {}

// var controller = Object.create(PeopleController.prototype);

// PeopleController.prototype.getPeople = (req, res) => {
//   res.status(200).json({ success: true, data: people });
// };

// PeopleController.prototype.createPerson = (req, res) => {
//   console.log(req.body);
//   const name = req.body.name;
//   if (!name) {
//     return res.status(400).json({ success: false, msg: 'please provide name value' });
//   }
//   res.status(200).send({ success: true, person: name });
// };

// PeopleController.prototype.updatePerson = (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;

//   const person = people.find((people) => people.id === Number(id));
//   if (!person) {
//     return res.status(404).json({ success: false, msg: `Person with id ${id} does not exist` });
//   }

//   const newPeople = people.map((person) => {
//     if (person.id === Number(id)) {
//       person.name = name;
//     }
//     return person;
//   });
//   res.status(200).send({ success: true, data: newPeople, msg: `Value changed: ${id} - ${name}` });
// };

// PeopleController.prototype.deletePerson = (req, res) => {
//   const { id } = req.params;

//   const person = people.find((people) => people.id === Number(id));
//   if (!person) {
//     return res.status(404).json({ success: false, msg: `Person with id ${id} does not exist` });
//   }

//   const newPeople = people.filter((person) => {
//     if (person.id !== Number(id)) {
//       return person;
//     }
//   });

//   res.status(200).json({ success: true, data: newPeople });
// };

// module.exports = controller;
