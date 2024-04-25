// const FunFact = require('../model/funFact.json');
// const State = require('../model/states.json')

const data = {
    states: require('../model/states.json'),
    // setStates: function (data) { this.States = data }
}

const getAllStates = async (req, res) => {
    // const employees = await FunFact.find();
    // if (!employees) return res.status(204).json({ 'message': 'No employees found.' });
    res.json(data.states);
}


const getState = (req, res) => {
    const state = data.states.find(st => st.code === req.params.slug);
    if (!state) {
        return res.status(400).json({ "message": `Employee ID ${req.params.slug} not found` });
    }
    res.json(state);
}

// const createNewEmployee = async (req, res) => {
//     if (!req?.body?.firstname || !req?.body?.lastname) {
//         return res.status(400).json({ 'message': 'First and last names are required' });
//     }

//     try {
//         const result = await FunFact.create({
//             firstname: req.body.firstname,
//             lastname: req.body.lastname
//         });

//         res.status(201).json(result);
//     } catch (err) {
//         console.error(err);
//     }
// }

// const updateEmployee = async (req, res) => {
//     if (!req?.body?.id) {
//         return res.status(400).json({ 'message': 'ID parameter is required.' });
//     }

//     const employee = await FunFact.findOne({ _id: req.body.id }).exec();
//     if (!employee) {
//         return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
//     }
//     if (req.body?.firstname) employee.firstname = req.body.firstname;
//     if (req.body?.lastname) employee.lastname = req.body.lastname;
//     const result = await employee.save();
//     res.json(result);
// }

// const deleteEmployee = async (req, res) => {
//     if (!req?.body?.id) return res.status(400).json({ 'message': 'FunFact ID required.' });

//     const employee = await FunFact.findOne({ _id: req.body.id }).exec();
//     if (!employee) {
//         return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
//     }
//     const result = await employee.deleteOne(); //{ _id: req.body.id }
//     res.json(result);
// }

// const getEmployee = async (req, res) => {
//     if (!req?.params?.id) return res.status(400).json({ 'message': 'FunFact ID required.' });

//     const employee = await FunFact.findOne({ _id: req.params.id }).exec();
//     if (!employee) {
//         return res.status(204).json({ "message": `No employee matches ID ${req.params.id}.` });
//     }
//     res.json(employee);
// }

module.exports = {
    getAllStates,
    getState
    // createNewEmployee,
    // updateEmployee,
    // deleteEmployee,
    // getEmployee
}