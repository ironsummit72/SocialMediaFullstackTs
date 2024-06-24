import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

type DBSchemaType = {
  name: string;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  displaypicture: string;
  coverpicture: string;
  followers: Array<mongoose.Schema.Types.ObjectId>;
  following: Array<mongoose.Schema.Types.ObjectId>;
};
const userSchema = new Schema<DBSchemaType>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    //validate email here
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displaypicture: {
    type: String,
    default: "",
  },
  coverpicture: {
    type: String,
    default: "",
  },
  followers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});
const saltRounds = 10;
userSchema.pre("save", async function (next) {
  const user = this;
  if (!this.isModified("password")) {
    return next();
  } else {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      console.error(error);
    }
  }
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
