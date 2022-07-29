"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("../config/logging"));
const category_1 = __importDefault(require("../models/category"));
const create = (req, res, next) => {
    logging_1.default.info("Attempting to register category...");
    let { name, image, icon, color } = req.body;
    const category = new category_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        icon,
        color,
        image,
    });
    return category
        .save()
        .then((newCategory) => {
        logging_1.default.info(`New category created...`);
        return res.status(201).json({ category: newCategory });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const read = (req, res, next) => {
    const _id = req.params.categoryID;
    logging_1.default.info(`Incoming read for ${_id} ...`);
    return category_1.default.findById(_id)
        .then((category) => {
        if (category) {
            return res.status(200).json({ category });
        }
        else {
            return res.status(404).json({ message: "category not found" });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const readAll = (req, res, next) => {
    // const author_id = req.params.authorID;
    logging_1.default.info(`Incoming read all...`);
    return (category_1.default.find() // { author: author_id }
        // .populate("author")
        .exec()
        .then((categories) => {
        return res.status(200).json({
            count: categories.length,
            categories,
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    }));
};
const query = (req, res, next) => {
    const { title } = req.query;
    const author_id = req.params.authorID;
    logging_1.default.info(`Incoming query...`);
    const titleRegex = title ? new RegExp(title.toString(), "i") : new RegExp("");
    return category_1.default.find({ title: { $regex: titleRegex }, author: author_id })
        .exec()
        .then((categories) => {
        return res.status(200).json({
            count: categories.length,
            categories,
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const update = (req, res, next) => {
    const _id = req.params.categoryID;
    logging_1.default.info(`Incoming update for ${_id} ...`);
    return category_1.default.findById(_id)
        .exec()
        .then((category) => {
        if (category) {
            category.set(req.body);
            category
                .save()
                .then((newCategory) => {
                logging_1.default.info(`Category updated...`);
                return res.status(201).json({ category: newCategory });
            })
                .catch((error) => {
                logging_1.default.error(error);
                return res.status(500).json({ error });
            });
        }
        else {
            return res.status(404).json({ message: "category not found" });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const deleteCategory = (req, res, next) => {
    const _id = req.params.categoryID;
    logging_1.default.info(`Incoming delete for ${_id} ...`);
    return category_1.default.findByIdAndDelete(_id)
        .then((category) => {
        return res.status(200).json({ message: "Category was deleted." });
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
    deleteCategory,
};
