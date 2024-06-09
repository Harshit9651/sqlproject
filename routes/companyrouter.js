const {createCompany, getAllCompanies } = require('../controller/companycontroller.js')
const express = require('express');

const router = express.Router();

router.post('/companies',createCompany);
router.get('/companies', getAllCompanies);

module.exports = router;
