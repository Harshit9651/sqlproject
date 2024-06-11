const Employee = require('../model/employe.js');
const company = require('../model/company.js')

const getAllEmployees = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const { count, rows: employees } = await Employee.findAndCountAll({
            include: {
                model: company
            },
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);

        res.render('listings/listallemploye.ejs', {
            employees,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error('Error fetching employees:', error); 
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
        const companyId = req.session.userId; // Ensure this is set correctly during company login
        
        if (!companyId) {
            return res.status(400).json({ error: 'Company ID not found in session' });
        }

        const newEmployee = await Employee.create({ firstName, lastName, email, position, password, companyId });
        res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'An error occurred while adding a new employee', details: error.message });
    }
};





module.exports = {  getAllEmployees ,employeecreatepage,addnewemployee};
