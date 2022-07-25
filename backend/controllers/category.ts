import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import logging from "../config/logging";
import Category from "../models/category";

const create = (req: Request, res: Response, next: NextFunction) => {
  logging.info("Attempting to register category...");

  let { name, image, icon, color } = req.body;

  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name,
    icon,
    color,
    image,
  });

  return category
    .save()
    .then((newCategory) => {
      logging.info(`New category created...`);
      return res.status(201).json({ category: newCategory });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const read = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.categoryID;

  logging.info(`Incoming read for ${_id} ...`);

  return Category.findById(_id)
    .then((category) => {
      if (category) {
        return res.status(200).json({ category });
      } else {
        return res.status(404).json({ message: "category not found" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  // const author_id = req.params.authorID;

  logging.info(`Incoming read all...`);

  return (
    Category.find() // { author: author_id }
      // .populate("author")
      .exec()
      .then((categories) => {
        return res.status(200).json({
          count: categories.length,
          categories,
        });
      })
      .catch((error) => {
        logging.error(error);
        return res.status(500).json({ error });
      })
  );
};

const query = (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.query;
  const author_id = req.params.authorID;

  logging.info(`Incoming query...`);

  const titleRegex = title ? new RegExp(title.toString(), "i") : new RegExp("");
  return Category.find({ title: { $regex: titleRegex }, author: author_id })
    .exec()
    .then((categories) => {
      return res.status(200).json({
        count: categories.length,
        categories,
      });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const update = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.categoryID;

  logging.info(`Incoming update for ${_id} ...`);

  return Category.findById(_id)
    .exec()
    .then((category) => {
      if (category) {
        category.set(req.body);

        category
          .save()
          .then((newCategory) => {
            logging.info(`Category updated...`);
            return res.status(201).json({ category: newCategory });
          })
          .catch((error) => {
            logging.error(error);
            return res.status(500).json({ error });
          });
      } else {
        return res.status(404).json({ message: "category not found" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const deleteCategory = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.categoryID;

  logging.info(`Incoming delete for ${_id} ...`);

  return Category.findByIdAndDelete(_id)
    .then((category) => {
      return res.status(200).json({ message: "Category was deleted." });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

export default {
  create,
  read,
  readAll,
  query,
  update,
  deleteCategory,
};
