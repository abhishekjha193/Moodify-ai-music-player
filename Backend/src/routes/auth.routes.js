const {Router} = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")
const blacklistModel = require("../models/blacklist.model")

const router = Router();

router.post('/register', authController.registeruser)
router.post('/login', authController.loginuser)
router.get('/get-me', authMiddleware, authController.getme)
router.get('/logout', authController.logoutuser)


module.exports = router;
