import dotenv from "dotenv";
dotenv.config();
type Env = {
  dbname: string | undefined;
  dburl: string | undefined;
  jwtsecret: null | undefined | string;
  originUrl: string | undefined;
};
const envs: Env = {
  dbname: process.env.DB_NAME,
  dburl: process.env.DB_URL,
  jwtsecret: process.env.JWT_SECRET_KEY,
  originUrl: process.env.ORIGIN_URL,
};
export default envs;
