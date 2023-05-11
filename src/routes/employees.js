const express = require("express");
const { Employee, Task } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (err) {
        console.error("ERROR: GET /employees/");
        console.error(err);
        res.status(500).json({
            message: "Error grabbing all employees",
        });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findAll({
            where: {
                id,
            },
            include: [{
                model: Task,
                as: 'tasks',
            }],
        });
        res.json(employee);
    } catch (err) {
        console.error(`ERROR: GET /employees/${id}`);
        console.error(err);
        res.status(500).json({
            message: `Error grabbing employee ID ${id}`,
        });
    }
})

module.exports = router;
