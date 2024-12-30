const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const bookCtrl = require("../controllers/book");

router.get("/", bookCtrl.getAllBooks);
router.post("/", auth, multer, bookCtrl.postOneBook);
router.get("/bestrating", bookCtrl.getBestRatedBooks);
router.get("/:id", bookCtrl.getOneBook);
router.put("/:id", auth, multer, bookCtrl.updateOneBook);
router.delete("/:id", auth, multer, bookCtrl.deleteOneBook);
router.post("/:id/rating", auth, bookCtrl.rateOneBook);

module.exports = router;
