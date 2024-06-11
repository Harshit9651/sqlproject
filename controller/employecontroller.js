const Employee = require('../model/employe.js');


const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({ include: 'Company' });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching employees' });
    }
};

const employeecreatepage = async (req,res)=>{
    try{
        await res.render('listings/employeeinput')
    }
    catch(error){
        res.status(500).json({error:"accured some error "})
    }
}
const addnewemployee = async (req, res) => {
    try {
        const { firstName, lastName, position, email, password } = req.body;
        console.log(firstName, lastName, position, email, password);

        const newEmployee = await Employee.create({ firstName, lastName, email, position, password });
        
        // Send the response
        res.status(201).json({ message: 'Data saved successfully', employee: newEmployee });
        
        console.log(newEmployee); 
    } catch (error) {
        res.status(500).json({ error: "An error occurred while adding a new employee" });
    }
};
module.exports = {  getAllEmployees ,employeecreatepage,addnewemployee};
