const {register} = require('../controllers/usersControllers')
const {login} = require('../controllers/usersControllers')

const router = require("express").Router();

router.post('/register', register)
router.post('/login', login)

module.exports = router;