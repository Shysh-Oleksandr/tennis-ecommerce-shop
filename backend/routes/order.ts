import express from "express";
import controller from "../controllers/order";

const router = express.Router();

router.get("/read/:orderID", controller.read);
router.get("/query/:authorID", controller.query);
router.get("/get/totalsales", controller.getTotalSales);
router.post("/create", controller.create);
router.patch("/update/:orderID", controller.update);
router.delete("/:orderID", controller.deleteOrder);
router.get("/", controller.readAll);
router.get("/:userID", controller.readUserOrders);

export = router;
