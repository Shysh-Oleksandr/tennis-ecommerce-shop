import express from "express";
import controller from "../controllers/product";

const router = express.Router();

router.get("/read/:productID", controller.read);
router.get("/query/:authorID", controller.query);
router.post("/create", controller.create);
router.patch("/update/:productID", controller.update);
router.delete("/:productID", controller.deleteProduct);
router.get("/", controller.readAll);

export = router;
