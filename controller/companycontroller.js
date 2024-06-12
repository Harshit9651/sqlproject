const { compareSync } = require('bcrypt');
const bcrypt = require('bcrypt');

const Company = require('../model/company.js');

const Employee = require('../model/employe.js');
const createCompany = async (req, res) => {
    try {
        const { name, location } = req.body;
        const newCompany = await Company.create({ name, location });
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the company' });
    }
};

const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching companies' });
    }
};
const getcompanyform = async (req,res)=>{
    try{
         await res.render('listings/companyinput.ejs');
    }
    catch(error){
        res.status(2000).json({error:"error accured for render this page"})
    }
}
// data created of a company 

const inpudata = async(req,res)=>{
    try{
        const{companyName,password,address,username}= req.body;
        const newCompany = await Company.create({ name: companyName, location: address, password: password,username:username });
        res.status(201).json(newCompany);
    }catch(error){
        res.status(500).json({ error: 'An error occurred when data is saving' });
    }
}
// show the main home page or we can say Landing page 
const Landingpage = async(req,res)=>{
    try{
        res.render('listings/index.ejs');
        console.log("landing page loaded successfully")
    }catch(error){
        console.log({error:"accured some error"})
    }
}
const optionforadmin = async(req,res)=>{
    try{
       await  res.render('listings/showoptionforadmin'
        );
    }catch(error){
        res.status(201).json({error:"some error accured to showing option for admin"})
    }
}
const loginform = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Company.findOne({ where: { username } });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                req.session.userId = user.id;
                req.session.isAdmin = true; // Set admin status
                res.redirect('/show'); // Redirect to admin options page
            } else {
                res.status(401).send('Invalid username or password');
            }
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        res.status(500).send('Error signing in');
    }
};

const deleteEmployeData = async (req, res) => {
    try {
        const companyId = req.body.companyId;
        const employee = await Employee.findOne({ where: { companyId: companyId } });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found or company ID is invalid' });
        }

        // Delete the employee
        await employee.destroy();

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
};

module.exports = { createCompany,
     getAllCompanies,
    getcompanyform,
    inpudata,
    Landingpage,
    optionforadmin,
    loginform,
    deleteEmployeData
  
   
 };
