const {createCompany, getAllCompanies,getcompanyform,inpudata,Landingpage,optionforadmin,loginform,deleteEmployeData} = require('../controller/companycontroller.js')
const express = require('express');
const {isAuthenticated,isAdmin} = require('../middleware/auth.js')
const router = express.Router();
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

router.post('/companies',createCompany);
router.get('/companies',isAuthenticated,isAdmin, getAllCompanies);
router.get('/company-inputpage',getcompanyform);
router.post('/companyInpu_data',inpudata)
router.get('/',Landingpage)
router.get('/show',isAdmin,isAuthenticated,optionforadmin)
router.post("/login",loginform)
router.post('/employees/delete/:id',deleteEmployeData)

module.exports = router;
