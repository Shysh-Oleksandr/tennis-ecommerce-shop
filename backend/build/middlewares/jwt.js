"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJwt = void 0;
const config_1 = __importDefault(require("../config/config"));
const express_jwt_1 = require("express-jwt");
function authJwt() {
    const secret = config_1.default.jwt_secret;
    return (0, express_jwt_1.expressjwt)({
        secret,
        algorithms: ["HS256"],
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
            `${config_1.default.api_url}/users/login`,
            `${config_1.default.api_url}/users/register`,
        ],
    });
}
exports.authJwt = authJwt;
