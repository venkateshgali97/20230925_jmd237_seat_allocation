var express = require('express');
var router = express.Router();
const userController = require("../Controllers/Users/User")






router.post('/add', userController.create_user)
router.get('/getAll', userController.get_all_users)
router.get('/:email', userController.get_logInUser)
router.put("/update", userController.update_user)



module.exports = router;