const express = require("express");
var bodyParser = require('body-parser')
const { Task, Employee } = require("../models");

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

router.get("/:id", async (req, res) => {
    try {
        const taskID = req.params.id;
        const task = await Task.findOne({where:{id:taskID}});
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
    try{
        const data = req.body;
        let newTask = Task.build(data);
        newTask.save();
        console.log(newTask.id);
        return res.json({msg: "new task added"});
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Could not add task",
        });
    }
});

//todo: Make route to update/edit task
router.put("/edit/:id", jsonParser, async (req, res) =>{
    const taskID = req.params.id;
    const updates = req.body;

    if("assignedUser" in updates){
        await Employee.findOne({where:{id:updates["assignedUser"]}})
            .then(results =>{
                if(!results){
                    //if the user does not exist remove the assignedUser key from the updates
                    delete updates["assignedUser"];
                }else{
                    //todo: remove the task from the user's tasks list 
                }
                console.log(results);
            });
    }

    try{
        Task.update(updates, {where:{id:taskID}});
        res.send("updated the task");
        return; 
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Error could not update task with given id",
        });
    }
});

//todo: Make route to delete task
module.exports = router;