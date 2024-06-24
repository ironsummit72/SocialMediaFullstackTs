import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./utils/connectDb.util";
import userRouter from "./routes/users.routes";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import envs from "./conf/env.conf";
import { isUserAuthenticated } from "./middlewares/isAuthenticated.middleware";
import getCurrentUser from "./middlewares/getCurrentUser.middleware";

const app = express();
const port = process.env.PORT || 3000;
// try to connect to db
app.use(
  cors({
    origin: envs.originUrl,
    credentials: true,
  }),
);

app.use(cookieParser());
connectDb();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.get("/", (req: Request, res: Response) => {
  const user = (req as any).user;
  res.status(200).send("up and running...." );
});
app.listen(port, () => {
  console.info(`listening on port ${port}`);
});
