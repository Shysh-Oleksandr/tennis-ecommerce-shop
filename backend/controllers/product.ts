import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import logging from "../config/logging";
import Product from "../models/product";

const create = (req: Request, res: Response, next: NextFunction) => {
  logging.info("Attempting to register product...");

  const file = req.file;

  if (!file) return res.status(400).send("No image in the request");
  const fileName = req.file?.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

  let {
    name,
    description,
    richDescription,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = req.body;

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
    description,
    richDescription,
    image: `${basePath}${fileName}` || "",
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
      logging.info(`New product created...`);
      return res.status(201).json({ product: newProduct });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const read = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.productID;

  logging.info(`Incoming read for ${_id} ...`);

  return Product.findById(_id)
    .populate("category")
    .then((product) => {
      if (product) {
        return res.status(200).json({ product });
      } else {
        return res.status(404).json({ message: "product not found" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  logging.info(`Incoming read all...`);

  return Product.find()
    .populate("category")
    .exec()
    .then((products) => {
      return res.status(200).json({
        count: products.length,
        products,
      });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const query = (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.query;
  const author_id = req.params.authorID;

  logging.info(`Incoming query...`);

  const titleRegex = title ? new RegExp(title.toString(), "i") : new RegExp("");
  return Product.find({ title: { $regex: titleRegex }, author: author_id })
    .exec()
    .then((products) => {
      return res.status(200).json({
        count: products.length,
        products,
      });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const update = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.productID;

  logging.info(`Incoming update for ${_id} ...`);

  return Product.findById(_id)
    .exec()
    .then((product) => {
      if (product) {
        product.set(req.body);

        product
          .save()
          .then((newProduct) => {
            logging.info(`Product updated...`);
            return res.status(201).json({ product: newProduct });
          })
          .catch((error) => {
            logging.error(error);
            return res.status(500).json({ error });
          });
      } else {
        return res.status(404).json({ message: "product not found" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const updateImages = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.productID;
  logging.info(`Incoming update images for ${_id} ...`);

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).send("Invalid Product Id");
  }

  const files: any = req.files;
  let imagesPaths: string[] = [];
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

  if (files) {
    files.map((file: any) => {
      imagesPaths.push(`${basePath}${file.filename}`);
    });
  }

  return Product.findById(_id)
    .exec()
    .then((product) => {
      if (product) {
        product.set({
          images: imagesPaths,
        });

        product
          .save()
          .then((newProduct) => {
            logging.info(`Product updated...`);
            return res.status(201).json({ product: newProduct });
          })
          .catch((error) => {
            logging.error(error);
            return res.status(500).json({ error });
          });
      } else {
        return res.status(404).json({ message: "product not found" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.productID;

  logging.info(`Incoming delete for ${_id} ...`);

  return Product.findByIdAndDelete(_id)
    .then((product) => {
      return res.status(200).json({ message: "Product was deleted." });
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
  deleteProduct,
  updateImages,
};
