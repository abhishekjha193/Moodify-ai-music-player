const express = require("express");
const upload = require("../middleware/upload.middleware");
const songController = require("../controllers/song.controller");

const router = express.Router();

router.post("/", upload.single("songs"), songController.uploadSong);

router.get("/", songController.getSong);

module.exports = router;