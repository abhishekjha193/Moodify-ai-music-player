const express = require("express")
const upload  = require("../middleware/upload.middleware")
const songcontroller = require("../controllers/song.controller")

const router = express.Router()

router.post("/", upload.single("songs"), songcontroller.uploadsong);

module.exports = router

