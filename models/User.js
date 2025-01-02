import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = model("User", userSchema);

export default User;
