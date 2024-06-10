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
const addnewemployee = async(req,res)=>{
    try{
        const{firstName,lastName,position,email,password} = req.body;
        console.log(firstName,lastName,position,email,password);
        const newemployee = await Employee.create({firstName,lastName,email,position,password});
        res.status(201).json('data saved succesfully ')
        console.lo(newemployee)
    }catch(error){
        res.status(500).json({error:"accured some error"})
    }
}
module.exports = {  getAllEmployees ,employeecreatepage,addnewemployee};
