import express from "express";
import controller from "../controllers/user";

const router = express.Router();

router.get("/validate", controller.validate);
router.get("/read/:userID", controller.read);
router.post("/register", controller.create);
router.post("/login", controller.login);
router.patch("/update/:userID", controller.update);
router.get("/", controller.readAll);

export = router;
