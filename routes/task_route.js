const express = require('express');
const router = express.Router();
const taskcontroller = require('../controller/task_controller');
const { authanticate, isadmin } = require('../middleware/authmiddleware');

router.post('/createtask', authanticate, isadmin, taskcontroller.addtask);
router.get('/getUserTasks', authanticate, taskcontroller.getUsertasks);


module.exports = router;