const express = require('express');
const { Employee, Task } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (err) {
        console.error('ERROR: GET /employees/');
        console.error(err);
        res.status(500).json({
            message: 'Error grabbing all employees',
        });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findAll({
            where: {
                id,
            },
            include: [
                {
                    model: Task,
                    as: 'tasks',
                },
            ],
        });
        res.json(employee);
    } catch (err) {
        console.error(`ERROR: GET /employees/${id}`);
        console.error(err);
        res.status(500).json({
            message: `Error grabbing employee ID ${id}`,
        });
    }
});

router.put('/editEmployee/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const editedEmployee = req.body;
        await Employee.update(editedEmployee, {
            where: {
                id,
            },
        });
        res.json(editedEmployee);
    } catch (err) {
        console.error(`ERROR: PUT /employees/edit/${id}`);
        console.error(err);
        res.status(500).json({
            message: `Error editing employee ID ${id}`,
        });
    }
});

router.post('/add', async (req, res) => {
    try {
        const newEmployee = req.body;
        await Employee.create(newEmployee);
        res.json(newEmployee);
    } catch (err) {
        console.error('ERROR: POST /employees/add');
        console.error(err);
        res.status(500).json({
            message: 'Error adding employee',
        });
    }
});

router.delete('/deleteEmployee/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Employee.destroy({
            where: {
                id,
            },
        });
        res.json({
            deletedId: id,
        });
    } catch (err) {
        console.error(`ERROR: DELETE /employees/delete/${id}`);
        console.error(err);
        res.status(500).json({
            message: 'Error removing employee',
        });
    }
});

module.exports = router;
