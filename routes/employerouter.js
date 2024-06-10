const express = require('express');
const { employeecreatepage, addnewemployee } = require('../controller/employecontroller.js');

const router = express.Router();


router.get('/employees-inputpage', employeecreatepage);
router.post('/register-employee',addnewemployee)

module.exports = router;
