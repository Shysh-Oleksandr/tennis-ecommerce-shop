import express from "express";
import controller from "../controllers/product";
import { uploadOptions } from "../middlewares/multer";

const router = express.Router();

router.get("/read/:productID", controller.read);
router.get("/query/:authorID", controller.query);
router.post("/create", uploadOptions.single("image"), controller.create);
router.patch("/update/:productID", controller.update);
router.patch(
  "/update/gallery-images/:productID",
  uploadOptions.array("images", 10),
  controller.updateImages
);
router.delete("/:productID", controller.deleteProduct);
router.get("/", controller.readAll);

export = router;
