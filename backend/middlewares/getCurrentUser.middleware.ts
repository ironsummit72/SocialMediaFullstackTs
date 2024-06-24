import jwt, { VerifyErrors } from "jsonwebtoken";
import envs from "../conf/env.conf";
import ApiResponse from "../utils/ApiResponse.util";
import { Request, Response, NextFunction } from "express";
const secret = envs.jwtsecret;
if (!secret) {
  throw new Error("JWT secret is required");
}

const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req?.cookies?.sessionId;
  if (token) {
    jwt.verify(token, secret, (err: VerifyErrors | null, decodedToken: object | string | undefined) => {
      if (err) {
        console.error(err);
        res.status(401).json(new ApiResponse("unauthorized", 401, "users is not authorized", null, null));
      } else {
        (req as any).user = decodedToken;
        next();
      }
    });
  }
};
export default getCurrentUser;
