const express = require("express");
const router = express.Router();

const bookCtrl = require("../controllers/book");

router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);
router.get("/bestrating", bookCtrl.getBestRatedBooks);
router.post("/", bookCtrl.postOneBook);
router.put("/:id", bookCtrl.updateOneBook);
router.delete("/:id", bookCtrl.deleteOneBook);
router.post("/:id/rating", bookCtrl.rateOneBook);

module.exports = router;
