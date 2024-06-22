const { compareSync } = require('bcrypt');
const fs = require('fs')
const  ExcelJS = require('exceljs')
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



const showdetails = async (req, res) => {
    try {
        // Read data from data.json file
        const rawData = fs.readFileSync('data.json');
        const books = JSON.parse(rawData);

        // Create a new Excel workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Books');

        // Define columns in the worksheet
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Title', key: 'name', width: 30 },
            { header: 'Author', key: 'author', width: 30 },
            { header: 'Description', key: 'description', width: 50 },
            // Add more columns as needed
        ];

        // Populate data into the worksheet
        books.forEach((book, index) => {
            worksheet.addRow({
                id: index + 1, // Example: use index + 1 as ID
                name: book.name,
                author: book.author,
                description: book.description,
                // Add more properties from your JSON data
            });
        });

        // Generate Excel file in memory
        const buffer = await workbook.xlsx.writeBuffer();

        // Set headers for the response
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="books.xlsx"');

        // Send the buffer as the response
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = { createCompany,
     getAllCompanies,
    getcompanyform,
    inpudata,
    Landingpage,
    optionforadmin,
    loginform,
    deleteEmployeData,showdetails
  
   
 };
