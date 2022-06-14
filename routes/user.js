const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const passport = require('passport');

const { userController } =require('../controllers');

const router = express.Router();

router.post('/signup', authMiddleware.checkAlreadyLogin, userController.signUp);
router.post('/login', authMiddleware.checkAlreadyLogin, userController.login);
router.get('/duplicates/email/:email', userController.duplicatesCheck);
router.get('/duplicates/nickname/:nickname', userController.duplicatesCheck);

router.get('/kakao', passport.authenticate('kakao', {session: false}));
router.get('/kakao/callback',passport.authenticate('kakao',{session: false}))

module.exports = router;