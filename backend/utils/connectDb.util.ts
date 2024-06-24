import mongoose from "mongoose";
import envs from "../conf/env.conf";
function connectDb(): void {
  mongoose
    .connect(`${envs.dburl}/${envs.dbname}`)
    .then((res) => console.log(`database connection established ${res.connection.host}:${res.connection.port}`))
    .catch((err) => console.error(`database connection failed ${err.message}`));
}
export default connectDb;
