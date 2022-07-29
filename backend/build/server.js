"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config/config"));
const logging_1 = __importDefault(require("./config/logging"));
const error_handler_1 = require("./middlewares/error-handler");
const jwt_1 = require("./middlewares/jwt");
const category_1 = __importDefault(require("./routes/category"));
const order_1 = __importDefault(require("./routes/order"));
const product_1 = __importDefault(require("./routes/product"));
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.default)();
const api = config_1.default.api_url;
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.default.mongo.url, config_1.default.mongo.options)
    .then((result) => {
    logging_1.default.info("Mongo Connected");
})
    .catch((error) => {
    logging_1.default.error(error);
});
/** Log the request */
router.use((req, res, next) => {
    logging_1.default.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on("finish", () => {
        logging_1.default.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
/** Middlewares */
router.use(express_1.default.urlencoded({ extended: true }));
router.use(express_1.default.json());
router.use((0, morgan_1.default)("tiny"));
router.use((0, jwt_1.authJwt)());
router.use("/public/uploads", express_1.default.static(__dirname + "/public/uploads"));
router.use(error_handler_1.errorHandler);
/** Rules of our API */
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
router.use((0, cors_1.default)({ origin: true, credentials: true }));
/** Routes */
router.use(`${api}/products`, product_1.default);
router.use(`${api}/categories`, category_1.default);
router.use(`${api}/users`, user_1.default);
router.use(`${api}/orders`, order_1.default);
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
router.listen(config_1.default.server.port, () => logging_1.default.info(`Server is running ${config_1.default.server.host}:${config_1.default.server.port}`));
