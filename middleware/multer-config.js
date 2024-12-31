const multer = require("multer");
const sharp = require("sharp");

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "images");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		sharp()
			.webp({ quality: 20 })
		callback(null, name + Date.now() + ".webp");
	},
});

module.exports = multer({ storage: storage }).single("image");
