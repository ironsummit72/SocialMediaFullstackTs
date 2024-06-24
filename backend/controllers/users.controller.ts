import { Request, Response } from "express";
export function addUser(req: Request, res: Response) {
  return res.send("add user ");
}
export function getUser(req: Request, res: Response) {
  return res.send("get user ");
}
