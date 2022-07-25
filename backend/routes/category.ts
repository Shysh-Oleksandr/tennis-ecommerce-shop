import express from "express";
import controller from "../controllers/category";

const router = express.Router();

router.get("/read/:categoryID", controller.read);
router.get("/query/:authorID", controller.query);
router.post("/create", controller.create);
router.patch("/update/:categoryID", controller.update);
router.delete("/:categoryID", controller.deleteCategory);
router.get("/", controller.readAll);

export = router;
