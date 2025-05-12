const express = require('express');
const router = express.Router();
const Usercontroller = require('../controller/user_controller');

router.post('/register', Usercontroller.register);
router.post('/login', Usercontroller.login);

module.exports = router;