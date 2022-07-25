import express from "express";
// import extractFirebaseInfo from "./../middleware/extractFirebaseInfo";
import controller from "../controllers/user";

const router = express.Router();

router.get("/validate", controller.validate); // extractFirebaseInfo (second argument)
router.get("/read/:userID", controller.read);
router.post("/create", controller.create); // extractFirebaseInfo (second argument)
router.post("/login", controller.login); // extractFirebaseInfo (second argument)
router.patch("/update/:userID", controller.update);
router.get("/", controller.readAll);

export = router;
