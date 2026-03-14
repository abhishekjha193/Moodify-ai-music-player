const {Router} = require("express")
const authController = require("../controllers/auth.controller")

const router = Router();

router.post('/register', authController.registeruser)
router.post('/login', authController.loginuser)

module.exports = router;
