const express = require('express');
const { employeecreatepage, addnewemployee, getAllEmployees } = require('../controller/employecontroller.js');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router();


router.get('/employees-inputpage',isAdmin, isAuthenticated, employeecreatepage);
router.post('/register-employee',isAdmin, isAuthenticated,addnewemployee)
router.get('/showallemploye',isAdmin, isAuthenticated, getAllEmployees)

module.exports = router;
