const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware")
const fileUploader = require("../middlewares/file-middleware")
const {boardController} = require("../controllers");

router.get('/travel', authMiddleware.checkLogin, boardController.listUp)
router.get('/travels/:boardId', authMiddleware.checkLogin, boardController.detailPage)
router.post('/travels', authMiddleware.checkLogin, boardController.savePage)
router.delete('/travels/:boardId', authMiddleware.checkLogin, boardController.deletePage)
router.patch('/travels/:boardId', authMiddleware.checkLogin, boardController.updatePage)

router.post('/image', fileUploader.single("img"), boardController.fileUpload)

module.exports = router;