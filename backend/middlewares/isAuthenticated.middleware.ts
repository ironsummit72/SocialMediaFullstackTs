import envs from "../conf/env.conf";
import jwt, { VerifyErrors } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/ApiResponse.util";
const secret = envs.jwtsecret;
if (!secret) {
  throw new Error("JWT_ENV is not defined");
}
export const isUserAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req?.cookies?.sessionId;
  if (token) {
    jwt.verify(token, secret, (err: VerifyErrors | null, decodedToken: object | string | undefined) => {
      if (err) {
        console.error(err);
        res.status(401).json(new ApiResponse("unauthorized", 401, "users is not authorized", null, null));
      } else {
        next();
      }
    });
  }
};
