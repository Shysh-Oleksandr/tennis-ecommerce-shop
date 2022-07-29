"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../controllers/product"));
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
router.get("/read/:productID", product_1.default.read);
router.get("/query/:authorID", product_1.default.query);
router.post("/create", multer_1.uploadOptions.single("image"), product_1.default.create);
router.patch("/update/:productID", product_1.default.update);
router.patch("/update/gallery-images/:productID", multer_1.uploadOptions.array("images", 10), product_1.default.updateImages);
router.delete("/:productID", product_1.default.deleteProduct);
router.get("/", product_1.default.readAll);
module.exports = router;
