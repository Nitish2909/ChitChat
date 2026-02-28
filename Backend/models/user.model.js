import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      public_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User",userSchema)