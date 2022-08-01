"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("../config/logging"));
const product_1 = __importDefault(require("../models/product"));
const create = (req, res, next) => {
    logging_1.default.info("Attempting to register product...");
    let { name, description, richDescription, brand, image, images, price, category, countInStock, rating, numReviews, isFeatured, } = req.body;
    const SEPARATOR = ",AND,";
    const product = new product_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        description,
        richDescription,
        image: image,
        images: images.split(SEPARATOR),
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
    });
    return product
        .save()
        .then((newProduct) => {
        logging_1.default.info(`New product created...`);
        return res.status(201).json({ product: newProduct });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const read = (req, res, next) => {
    const _id = req.params.productID;
    logging_1.default.info(`Incoming read for ${_id} ...`);
    return product_1.default.findById(_id)
        .populate("category")
        .then((product) => {
        if (product) {
            return res.status(200).json({ product });
        }
        else {
            return res.status(404).json({ message: "product not found" });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const readAll = (req, res, next) => {
    logging_1.default.info(`Incoming read all...`);
    return product_1.default.find()
        .populate("category")
        .exec()
        .then((products) => {
        return res.status(200).json({
            count: products.length,
            products,
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
    return product_1.default.find({ title: { $regex: titleRegex }, author: author_id })
        .exec()
        .then((products) => {
        return res.status(200).json({
            count: products.length,
            products,
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const update = (req, res, next) => {
    const _id = req.params.productID;
    logging_1.default.info(`Incoming update for ${_id} ...`);
    return product_1.default.findById(_id)
        .exec()
        .then((product) => {
        if (product) {
            product.set(req.body);
            product
                .save()
                .then((newProduct) => {
                logging_1.default.info(`Product updated...`);
                return res.status(201).json({ product: newProduct });
            })
                .catch((error) => {
                logging_1.default.error(error);
                return res.status(500).json({ error });
            });
        }
        else {
            return res.status(404).json({ message: "product not found" });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const updateImages = (req, res, next) => {
    const _id = req.params.productID;
    logging_1.default.info(`Incoming update images for ${_id} ...`);
    if (!mongoose_1.default.isValidObjectId(_id)) {
        return res.status(400).send("Invalid Product Id");
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    if (files) {
        files.map((file) => {
            imagesPaths.push(`${basePath}${file.filename}`);
        });
    }
    return product_1.default.findById(_id)
        .exec()
        .then((product) => {
        if (product) {
            product.set({
                images: imagesPaths,
            });
            product
                .save()
                .then((newProduct) => {
                logging_1.default.info(`Product updated...`);
                return res.status(201).json({ product: newProduct });
            })
                .catch((error) => {
                logging_1.default.error(error);
                return res.status(500).json({ error });
            });
        }
        else {
            return res.status(404).json({ message: "product not found" });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const deleteProduct = (req, res, next) => {
    const _id = req.params.productID;
    logging_1.default.info(`Incoming delete for ${_id} ...`);
    return product_1.default.findByIdAndDelete(_id)
        .then((product) => {
        return res.status(200).json({ message: "Product was deleted." });
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
    deleteProduct,
    updateImages,
};
