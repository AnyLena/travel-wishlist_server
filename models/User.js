import mongoose from "mongoose";

const emailRegEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    match: [emailRegEx, "Please enter a valid email address."],
  },
  password: {
    required: true,
    type: String,
  },
  admin: {
    required: true,
    type: Boolean
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
