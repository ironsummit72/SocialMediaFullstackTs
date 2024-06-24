import { Request, Response } from "express";
import userModel from "../models/user.models";
import ApiResponse from "../utils/ApiResponse.util";
import bcrypt from "bcrypt";
import { signToken } from "../utils/Jwt.util";

export async function handleRegister(req: Request, res: Response) {
  try {
    const { username, email, firstname, lastname, password, cpassword } = req.body;
    if (username && email && firstname && lastname && password && cpassword) {
      const checkUsername = await userModel.findOne({ username });
      const checkEmail = await userModel.findOne({ email });
      if (checkUsername) {
        return res.status(400).json(new ApiResponse("bad request", 400, `this ${username} username already exists please use a different username`, null, null));
      } else if (checkEmail) {
        return res.status(400).json(new ApiResponse("bad request", 400, `this ${email} email already exists please use a different email`, null, null));
      } else {
        const dbResponse = await userModel.create({ username, email, firstname, lastname, password });
        res.status(200).json(new ApiResponse("success", 200, `user registration successful`, dbResponse, null));
      }
    }
  } catch (error) {
    console.error(error);
  }
}
export async function handleLogin(req: Request, res: Response) {
  const { username, email, password } = req.body;
  if (username) {
    const dbResponse = await userModel.findOne({ username });
    if (dbResponse) {
      const match = await bcrypt.compare(password, dbResponse.password);
      if (match) {
        res.cookie("sessionId", signToken({ userId: dbResponse.id, username: dbResponse.username }), { httpOnly: true });
        res.status(200).json(new ApiResponse("login success", 200, `hi ${username} welcome back `, null, null));
      } else {
        res.status(401).json(new ApiResponse("unauthorized", 401, "password does not match", null, "/"));
      }
    } else {
      return res.status(404).json(new ApiResponse("not found", 404, `${username} not found please register yourself first`, null, null));
    }
  } else if (email) {
    const dbResponse = await userModel.findOne({ email });
    if (dbResponse) {
      const match = await bcrypt.compare(password, dbResponse.password);
      if (match) {
        res.cookie("sessionId", signToken({ userId: dbResponse.id, username: dbResponse.username }), { httpOnly: true });
        res.status(200).json(new ApiResponse("success", 200, `hi ${dbResponse?.username} welcome back `, null, null));
      } else {
        res.status(401).json(new ApiResponse("unauthorized", 401, "password does not match", null, null));
      }
    } else {
      return res.status(404).json(new ApiResponse("not found", 404, `${email} not found please register yourself first`, null, null));
    }
  } else {
    return res.send(400).json(new ApiResponse("bad request", 400, `please enter username or email to login`, null, null));
  }
}
