import config from "../config/config";
import { expressjwt } from "express-jwt";

export function authJwt() {
  const secret = config.jwt_secret;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      `${config.api_url}/users/login`,
      `${config.api_url}/users/register`,
    ],
  });
}
