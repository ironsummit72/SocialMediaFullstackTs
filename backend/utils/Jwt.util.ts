import jwt, { SignOptions, JwtPayload, VerifyErrors } from "jsonwebtoken";
import envs from "../conf/env.conf";
const secret = envs.jwtsecret;
if (!secret) {
  throw new Error("JWT_ENV is not defined");
}
interface JwtPayloadExtended extends JwtPayload {
  userId: string;
  username: string;
}
export const signToken = (payload: JwtPayloadExtended, options?: SignOptions): string => {
  return jwt.sign(payload, secret, options);
};
export const verifyToken = (token: string): Promise<JwtPayloadExtended> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err: VerifyErrors | null, decoded: object | undefined | string) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtPayloadExtended);
      }
    });
  });
};
