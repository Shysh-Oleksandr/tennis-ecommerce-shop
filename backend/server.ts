import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import config from "./config/config";
import logging from "./config/logging";
import { errorHandler } from "./middlewares/error-handler";
import { authJwt } from "./middlewares/jwt";
import categoryRoutes from "./routes/category";
import orderRoutes from "./routes/order";
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";
import cors from "cors";

const router = express();
const api = config.api_url;

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then((result) => {
    logging.info("Mongo Connected");
  })
  .catch((error) => {
    logging.error(error);
  });

/** Log the request */
router.use((req, res: any, next) => {
  logging.info(
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logging.info(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/** Middlewares */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(morgan("tiny"));
router.use(authJwt());
router.use("/public/uploads", express.static(__dirname + "/public/uploads"));
router.use(errorHandler);
/** Rules of our API */
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});
router.use(cors({ origin: true, credentials: true }));

/** Routes */
router.use(`${api}/products`, productRoutes);
router.use(`${api}/categories`, categoryRoutes);
router.use(`${api}/users`, userRoutes);
router.use(`${api}/orders`, orderRoutes);

router.get("/hello", (req, res) => {
  res.send("Hello World");
});

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

/** Listen */
router.listen(config.server.port, () =>
  logging.info(`Server is running ${config.server.host}:${config.server.port}`)
);
