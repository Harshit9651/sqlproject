const express = require('express');
const { createEmployee, getAllEmployees } = require('../controller/employecontroller.js');

const router = express.Router();

router.post('/employees', createEmployee);
router.get('/employees', getAllEmployees);

module.exports = router;
