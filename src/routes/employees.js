const express = require("express");
const { Employee } = require("../models");

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

module.exports = router;
