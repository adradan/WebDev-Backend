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

router.get("/task/:id", jsonParser, async (req, res) => {
    try {
        const userID = params.id;
        const task = await Task.findOne({ where: { id: userID } });
        console.log(userID);
        res.json(task);
    } catch (err) {
        console.error("ERROR: GET /task/");
        console.error(err);
        res.status(500).json({
            message: "Error task with given id",
        });
    }
});

router.post("/add", jsonParser,  (req, res) => {
    const data = req.body;
    let newTask = Task.build(data);
    newTask.save();
    console.log(newTask.id);
    return res.json({msg: "new task added"});
});

//todo: Make route to update/edit task
//todo: Make route to delete task
module.exports = router;