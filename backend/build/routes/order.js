"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const order_1 = __importDefault(require("../controllers/order"));
const router = express_1.default.Router();
router.get("/read/:orderID", order_1.default.read);
router.get("/query/:authorID", order_1.default.query);
router.get("/get/totalsales", order_1.default.getTotalSales);
router.post("/create", order_1.default.create);
router.patch("/update/:orderID", order_1.default.update);
router.delete("/:orderID", order_1.default.deleteOrder);
router.get("/", order_1.default.readAll);
router.get("/get/userorders/:userID", order_1.default.readUserOrders);
module.exports = router;
