const songModel = require("../models/song.model")
const id3 = require("node-id3")

async function uploadsong(req, res) {
    const tags = id3.read(req.file.buffer) 

    return res.status(200).json({
        message: "file received",
        file: req.file
    });
}

module.exports = {uploadsong}