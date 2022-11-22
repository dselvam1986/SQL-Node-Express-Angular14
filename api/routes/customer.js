const express = require('express');
const router = express.Router();
const customer = require('../controllers/customers');

router.get('/', customer.getCustomer);

router.post('/', customer.insertCustomer);

router.put('/:id', customer.updateCustomer);

router.delete('/:id', customer.deleteCustomer);

module.exports = router;
