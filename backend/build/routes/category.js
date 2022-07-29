"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const category_1 = __importDefault(require("../controllers/category"));
const router = express_1.default.Router();
router.get("/read/:categoryID", category_1.default.read);
router.get("/query/:authorID", category_1.default.query);
router.post("/create", category_1.default.create);
router.patch("/update/:categoryID", category_1.default.update);
router.delete("/:categoryID", category_1.default.deleteCategory);
router.get("/", category_1.default.readAll);
module.exports = router;
