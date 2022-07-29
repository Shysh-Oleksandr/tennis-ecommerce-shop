"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const router = express_1.default.Router();
router.get("/validate", user_1.default.validate);
router.get("/read/:userID", user_1.default.read);
router.post("/register", user_1.default.create);
router.post("/login", user_1.default.login);
router.patch("/update/:userID", user_1.default.update);
router.get("/", user_1.default.readAll);
module.exports = router;
