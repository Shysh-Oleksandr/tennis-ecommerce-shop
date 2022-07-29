"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("../config/logging"));
const order_1 = __importDefault(require("../models/order"));
const orderItem_1 = __importDefault(require("../models/orderItem"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Attempting to register order...");
    let { shippingAddress1, shippingAddress2, city, zip, country, phone, status, totalPrice, orderItems, user, } = req.body;
    const orderItemsIds = Promise.all(orderItems.map((orderItem) => __awaiter(void 0, void 0, void 0, function* () {
        let newOrderItem = new orderItem_1.default({
            quantity: orderItem.quantity,
            product: orderItem.product,
        });
        newOrderItem = yield newOrderItem.save();
        return newOrderItem._id;
    })));
    const orderItemsIdsResolved = yield orderItemsIds;
    const orderTotalPrices = yield Promise.all(orderItemsIdsResolved.map((orderItemId) => __awaiter(void 0, void 0, void 0, function* () {
        const orderItem = yield orderItem_1.default.findById(orderItemId).populate("product", "price");
        const totalPrice = orderItem
            ? orderItem.product.price * orderItem.quantity
            : 0;
        return totalPrice;
    })));
    const orderTotalPrice = orderTotalPrices.reduce((a, b) => a + b, 0);
    const order = new order_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        shippingAddress1,
        shippingAddress2,
        city,
        zip,
        country,
        phone,
        status,
        totalPrice: orderTotalPrice,
        orderItems: orderItemsIdsResolved,
        user,
    });
    return order
        .save()
        .then((newOrder) => {
        logging_1.default.info(`New order created...`);
        return res.status(201).json({ order: newOrder });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
});
const getTotalSales = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(`Incoming read for total sales ...`);
    const totalSales = yield order_1.default.aggregate([
        { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
    ]);
    if (!totalSales) {
        return res
            .status(400)
            .json({ message: "The order sales cannot be generated." });
    }
    return res.status(200).json({ totalSales: totalSales.pop().totalsales });
});
const read = (req, res, next) => {
    const _id = req.params.orderID;
    if (!mongoose_1.default.isValidObjectId(_id)) {
        return res.status(400).send("Invalid Order Id");
    }
    logging_1.default.info(`Incoming read for ${_id} ...`);
    return order_1.default.findById(_id)
        .populate("user", "name")
        .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
    })
        .sort({ dateOrdered: -1 })
        .then((order) => {
        if (order) {
            return res.status(200).json({ order });
        }
        else {
            return res.status(404).json({ message: "order not found" });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const readAll = (req, res, next) => {
    logging_1.default.info(`Incoming read all...`);
    return order_1.default.find()
        .populate("user", "name")
        .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
    })
        .sort({ dateOrdered: -1 })
        .exec()
        .then((orders) => {
        return res.status(200).json({
            count: orders.length,
            orders,
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const query = (req, res, next) => {
    const { title } = req.query;
    const author_id = req.params.authorID;
    logging_1.default.info(`Incoming query...`);
    const titleRegex = title ? new RegExp(title.toString(), "i") : new RegExp("");
    return order_1.default.find({ title: { $regex: titleRegex }, author: author_id })
        .exec()
        .then((orders) => {
        return res.status(200).json({
            count: orders.length,
            orders,
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const update = (req, res, next) => {
    const _id = req.params.orderID;
    if (!mongoose_1.default.isValidObjectId(_id)) {
        return res.status(400).send("Invalid Order Id");
    }
    logging_1.default.info(`Incoming update for ${_id} ...`);
    return order_1.default.findById(_id)
        .exec()
        .then((order) => {
        if (order) {
            order.set(req.body);
            order
                .save()
                .then((newOrder) => {
                logging_1.default.info(`Order updated...`);
                return res.status(201).json({ order: newOrder });
            })
                .catch((error) => {
                logging_1.default.error(error);
                return res.status(500).json({ error });
            });
        }
        else {
            return res.status(404).json({ message: "order not found" });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.orderID;
    if (!mongoose_1.default.isValidObjectId(_id)) {
        return res.status(400).send("Invalid Order Id");
    }
    logging_1.default.info(`Incoming delete for ${_id} ...`);
    return order_1.default.findByIdAndDelete(_id)
        .then((order) => __awaiter(void 0, void 0, void 0, function* () {
        if (order) {
            order.orderItems.map((orderItem) => __awaiter(void 0, void 0, void 0, function* () {
                yield orderItem_1.default.findByIdAndRemove(orderItem);
            }));
            return res.status(200).json({ message: "Order was deleted." });
        }
        else {
            return res.status(404).json({ message: "Can't delete order." });
        }
    }))
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
});
const readUserOrders = (req, res, next) => {
    const _id = req.params.userID;
    if (!mongoose_1.default.isValidObjectId(_id)) {
        return res.status(400).send("Invalid Order Id");
    }
    logging_1.default.info(`Incoming read all users orders...`);
    return order_1.default.find({ user: _id })
        .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
    })
        .sort({ dateOrdered: -1 })
        .exec()
        .then((orders) => {
        return res.status(200).json({
            count: orders.length,
            orders,
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
exports.default = {
    create,
    read,
    readAll,
    query,
    update,
    deleteOrder,
    getTotalSales,
    readUserOrders,
};
