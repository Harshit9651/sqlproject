const { compareSync } = require('bcrypt');
const Company = require('../model/company.js');
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
        const{companyName,password,address}= req.body;
        const newCompany = await Company.create({ name: companyName, location: address, password: password });
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

module.exports = { createCompany,
     getAllCompanies,
    getcompanyform,
    inpudata,
    Landingpage
 };
