const {createCompany, getAllCompanies,getcompanyform,inpudata,Landingpage } = require('../controller/companycontroller.js')
const express = require('express');

const router = express.Router();

router.post('/companies',createCompany);
router.get('/companies', getAllCompanies);
router.get('/company-inputpage',getcompanyform);
router.post('/companyInpu_data',inpudata)
router.get('/',Landingpage)


module.exports = router;
