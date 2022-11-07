const { addMsg, getAllMsg } = require('../controllers/messagesController')

const router = require("express").Router();

router.post('/addMsg', addMsg)
router.post('/getMsg', getAllMsg)


module.exports = router;