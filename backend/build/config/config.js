"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    mongo: {
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            keepAlive: true,
            autoIndex: false,
            retryWrites: false,
        },
        url: "mongodb+srv://frankmelward:sashashysh3682@cluster0.ibcicnr.mongodb.net/?retryWrites=true&w=majority",
    },
    server: {
        host: "localhost",
        port: process.env.PORT || 8001,
        url: "https://ecommerce-projecto.herokuapp.com",
    },
    api_url: "/api/v1",
    jwt_secret: "whereAreTheTurtles",
};
exports.default = config;
