const express = require('express');
const router = express.Router();
const {register} = require('../controllers/usersControllers')

router.post('/register', register)

module.exports = router;