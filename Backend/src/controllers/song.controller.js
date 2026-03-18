const songModel = require("../models/song.model");
const storageService = require("../service/storage.service.js");
const id3 = require("node-id3");

async function uploadSong(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    const tags = id3.read(songBuffer);

    const title = tags.title || "unknown_song";

    const posterBuffer = tags.image ? tags.image.imageBuffer : null;

    const songFile = await storageService.uploadFile({
      buffer: songBuffer,
      filename: title + ".mp3",
      folder: "/cohort-2/moodify/songs",
    });

    let posterFile = null;

    if (posterBuffer) {
      posterFile = await storageService.uploadFile({
        buffer: posterBuffer,
        filename: title + ".jpeg",
        folder: "/cohort-2/moodify/posters",
      });
    }

    const song = await songModel.create({
      title,
      url: songFile.url,
      posterUrl: posterFile ? posterFile.url : null,
      mood,
    });

    res.status(201).json({
      message: "song created successfully",
      song,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getSong(req, res) {
  try {
    const { mood } = req.query;

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    const songs = await songModel.aggregate([
      { $match: { mood } },
      { $sample: { size: 1 } }, // 🔥 random pick
    ]);

    if (!songs.length) {
      return res.status(404).json({ message: "No song found" });
    }

    res.status(200).json({
      message: "random song fetched successfully",
      song: songs[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { uploadSong, getSong };
