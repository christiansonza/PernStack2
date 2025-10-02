const express = require('express') 
const router = express.Router()
const {getUser,postUser,updateUser,destroyUser, getUserId} = require('../controller/userController')

router.get('/',getUser)
router.get('/:id',getUserId)
router.post('/',postUser)
router.put('/:id',updateUser)
router.delete('/:id',destroyUser)


module.exports = router