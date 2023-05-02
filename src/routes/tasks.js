const express = require("express");
var bodyParser = require('body-parser')
const { Task } = require("../models");

const router = express.Router();
const jsonParser = bodyParser.json()

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (err) {
        console.error("ERROR: GET /tasks/");
        console.error(err);
        res.status(500).json({
            message: "Error grabbing all tasks",
        });
    }
});

router.post("/add", jsonParser,  (req, res) => {
    const data = req.body;
    let newTask = Task.build(data);

    console.log(newTask.id);
    return res.json({msg: "new task added"});
});

module.exports = router;