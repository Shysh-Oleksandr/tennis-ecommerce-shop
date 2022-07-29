import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import logging from "../config/logging";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";

const validate = (req: Request, res: Response, next: NextFunction) => {
  logging.info("Token validated, returning user...");

  let firebase = res.locals.firebase;

  return User.findOne({ uid: firebase.uid })
    .then((user) => {
      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(401).json({ message: "user not found" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const create = (req: Request, res: Response, next: NextFunction) => {
  logging.info("Attempting to register user...");

  let {
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  });

  return user
    .save()
    .then((newUser) => {
      logging.info(`New user ${name} created...`);
      return res.status(201).json({
        user: newUser,
      });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const update = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.userID;

  logging.info(`Incoming update for ${_id} ...`);

  return User.findById(_id)
    .exec()
    .then((user) => {
      if (user) {
        user.set(req.body);

        user
          .save()
          .then((newUser) => {
            logging.info(`User updated...`);
            return res.status(201).json({ user: newUser });
          })
          .catch((error) => {
            logging.error(error);
            return res.status(500).json({ error });
          });
      } else {
        return res.status(404).json({ message: "user not found" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  logging.info("Loginning user...");

  let { email, password } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        logging.info(`User ${email} found...`);

        if (bcrypt.compareSync(password, user.passwordHash)) {
          logging.info(`Password matches, signing in...`);
          const token = jwt.sign(
            {
              userId: user._id,
              isAdmin: user.isAdmin,
            },
            config.jwt_secret,
            { expiresIn: "30d" }
          );

          return res.status(200).json({
            user: user,
            token,
          });
        } else {
          logging.info(`Password wrong`);
          return res.status(400).json({
            message: "Wrong password",
          });
        }
      } else {
        logging.info(`User ${email} not found`);
        return res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const read = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.userID;

  logging.info(`Incoming read for ${_id} ...`);

  return User.findById(_id)
    .select("-passwordHash")
    .then((user) => {
      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(404).json({ message: "user not found" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  logging.info(`Incoming read all...`);

  return User.find()
    .select("-passwordHash")
    .exec()
    .then((users) => {
      return res.status(200).json({
        count: users.length,
        users,
      });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({ error });
    });
};

export default {
  validate,
  create,
  login,
  read,
  update,
  readAll,
};
