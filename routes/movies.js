const express = require("express");
const storage = require('../lib/multer.js')
const { add, edit, remove, get, getAll, uploadVideo } = require("../controllers/movie.js");

const router = express.Router();

router.get("/list", getAll);
router.get("/:id", get);
router.post("/add", add);
router.post("/upload", storage.single('file'), uploadVideo)
router.put("/:id", edit);
router.delete("/:id", remove);

module.exports = router
