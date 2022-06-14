const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware")
const { userController } = require('../controllers');

router.post('/signup', authMiddleware.checkAlreadyLogin, userController.signUp);
router.post('/login', authMiddleware.checkAlreadyLogin, userController.login);
router.get('/duplicates/email/:email', userController.duplicatesCheck);
router.get('/duplicates/nickname/:nickname', userController.duplicatesCheck);

module.exports = router;