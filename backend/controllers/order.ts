import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import logging from "../config/logging";
import Order from "../models/order";
import OrderItem from "../models/orderItem";
import IOrderItem from "./../interfaces/orderItem";

const create = async (req: Request, res: Response, next: NextFunction) => {
  logging.info("Attempting to register order...");

  let {
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    orderItems,
    user,
  } = req.body;

  const orderItemsIds = Promise.all(
    orderItems.map(async (orderItem: IOrderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );

  const orderItemsIdsResolved = await orderItemsIds;

  const orderTotalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem
        ? orderItem.product.price * orderItem.quantity
        : 0;
      return totalPrice;
    })
  );

  const orderTotalPrice = orderTotalPrices.reduce((a, b) => a + b, 0);

  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
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
      logging.info(`New order created...`);
      return res.status(201).json({ order: newOrder });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const getTotalSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(`Incoming read for total sales ...`);

  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
  ]);
  if (!totalSales) {
    return res
      .status(400)
      .json({ message: "The order sales cannot be generated." });
  }

  return res.status(200).json({ totalSales: totalSales.pop().totalsales });
};

const read = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.orderID;
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).send("Invalid Order Id");
  }

  logging.info(`Incoming read for ${_id} ...`);

  return Order.findById(_id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ dateOrdered: -1 })
    .then((order) => {
      if (order) {
        return res.status(200).json({ order });
      } else {
        return res.status(404).json({ message: "order not found" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  logging.info(`Incoming read all...`);

  return Order.find()
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
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const query = (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.query;
  const author_id = req.params.authorID;

  logging.info(`Incoming query...`);

  const titleRegex = title ? new RegExp(title.toString(), "i") : new RegExp("");
  return Order.find({ title: { $regex: titleRegex }, author: author_id })
    .exec()
    .then((orders) => {
      return res.status(200).json({
        count: orders.length,
        orders,
      });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const update = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.orderID;
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).send("Invalid Order Id");
  }

  logging.info(`Incoming update for ${_id} ...`);

  return Order.findById(_id)
    .exec()
    .then((order) => {
      if (order) {
        order.set(req.body);

        order
          .save()
          .then((newOrder) => {
            logging.info(`Order updated...`);
            return res.status(201).json({ order: newOrder });
          })
          .catch((error) => {
            logging.error(error);
            return res.status(500).json({ error });
          });
      } else {
        return res.status(404).json({ message: "order not found" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.orderID;
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).send("Invalid Order Id");
  }

  logging.info(`Incoming delete for ${_id} ...`);

  return Order.findByIdAndDelete(_id)
    .then(async (order) => {
      if (order) {
        order.orderItems.map(async (orderItem: IOrderItem) => {
          await OrderItem.findByIdAndRemove(orderItem);
        });
        return res.status(200).json({ message: "Order was deleted." });
      } else {
        return res.status(404).json({ message: "Can't delete order." });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const readUserOrders = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.userID;
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).send("Invalid Order Id");
  }

  logging.info(`Incoming read all users orders...`);

  return Order.find({ user: _id })
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
  deleteOrder,
  getTotalSales,
  readUserOrders,
};
