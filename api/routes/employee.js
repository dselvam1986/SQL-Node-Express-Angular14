const express = require('express');
const router = express.Router();

var employees = require('../controllers/employees');

// api/employees is replaced with / because the path is set up in app.js in app.use
router.get('/', employees.getEmployee);
router.post('/', employees.createEmployee);
router.put('/:id', employees.updateEmployee);
router.delete('/:id', employees.deleteEmployee);

// another way to chain it
// router.route('/').get(getemployees).post(createPerson);
// router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
