const express = require('express');
const router = express.Router();

const avatarsController = require('../controllers/avatarsController');

router.get('/', async (req,res) => {
    const avatars = await avatarsController.getAvatars()
    res.json(avatars);
})

module.exports = router;