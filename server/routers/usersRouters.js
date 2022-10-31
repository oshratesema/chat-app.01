const {register, setAvatar, login} = require('../controllers/usersControllers')

const router = require("express").Router();

router.post('/register', register)
router.post('/login', login)
router.post('/setAvatar/:id', setAvatar)

module.exports = router;