const {register, setAvatar, login, getAllUsers} = require('../controllers/userControllers')

const router = require("express").Router();

router.post('/register', register)
router.post('/login', login)
router.post('/setAvatar/:id', setAvatar)
router.get('/allUsers/:id', getAllUsers)


module.exports = router;

// https://chat-server-mu9a.onrender.com/api/auth/allUsers