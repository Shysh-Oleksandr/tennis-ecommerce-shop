"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("../config/logging"));
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const validate = (req, res, next) => {
    logging_1.default.info("Token validated, returning user...");
    let firebase = res.locals.firebase;
    return user_1.default.findOne({ uid: firebase.uid })
        .then((user) => {
        if (user) {
            return res.status(200).json({ user });
        }
        else {
            return res.status(401).json({ message: "user not found" });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const create = (req, res, next) => {
    logging_1.default.info("Attempting to register user...");
    let { name, email, password, phone, isAdmin, street, apartment, zip, city, country, } = req.body;
    const user = new user_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        email,
        passwordHash: bcryptjs_1.default.hashSync(password, 10),
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
        logging_1.default.info(`New user ${name} created...`);
        return res.status(201).json({
            user: newUser,
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const update = (req, res, next) => {
    const _id = req.params.userID;
    logging_1.default.info(`Incoming update for ${_id} ...`);
    return user_1.default.findById(_id)
        .exec()
        .then((user) => {
        if (user) {
            user.set(req.body);
            user
                .save()
                .then((newUser) => {
                logging_1.default.info(`User updated...`);
                return res.status(201).json({ user: newUser });
            })
                .catch((error) => {
                logging_1.default.error(error);
                return res.status(500).json({ error });
            });
        }
        else {
            return res.status(404).json({ message: "user not found" });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const login = (req, res, next) => {
    logging_1.default.info("Loggin in user...");
    let { email, password } = req.body;
    return user_1.default.findOne({ email })
        .then((user) => {
        if (user) {
            logging_1.default.info(`User ${email} found...`);
            logging_1.default.info(`${password}  . bcry: ${bcryptjs_1.default.hashSync(password, 10)} hash: ${user.passwordHash}.`);
            logging_1.default.info(bcryptjs_1.default.compareSync(password, user.passwordHash));
            if (bcryptjs_1.default.compareSync(password, user.passwordHash)) {
                logging_1.default.info(`Password matches, signing in...`);
                const token = jsonwebtoken_1.default.sign({
                    userId: user._id,
                    isAdmin: user.isAdmin,
                }, config_1.default.jwt_secret, { expiresIn: "30d" });
                return res.status(200).json({
                    user: user.email,
                    token,
                });
            }
            else {
                logging_1.default.info(`Password wrong`);
                return res.status(400).json({
                    message: "Wrong password",
                });
            }
        }
        else {
            logging_1.default.info(`User ${email} not found`);
            return res.status(200).json({
                message: "User not found",
            });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const read = (req, res, next) => {
    const _id = req.params.userID;
    logging_1.default.info(`Incoming read for ${_id} ...`);
    return user_1.default.findById(_id)
        .select("-passwordHash")
        .then((user) => {
        if (user) {
            return res.status(200).json({ user });
        }
        else {
            return res.status(404).json({ message: "user not found" });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const readAll = (req, res, next) => {
    logging_1.default.info(`Incoming read all...`);
    return user_1.default.find()
        .select("-passwordHash")
        .exec()
        .then((users) => {
        return res.status(200).json({
            count: users.length,
            users,
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
exports.default = {
    validate,
    create,
    login,
    read,
    update,
    readAll,
};
