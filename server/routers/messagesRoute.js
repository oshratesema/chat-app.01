const { addMessage, getAllMsg } = require("../controllers/messagesController");
const router = require("express").Router();

router.post("/addMsg/", addMessage);
router.post("/getMsg/", getAllMsg);

module.exports = router;
