import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      require: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      require: true,
    },
    text:String,
    media:String
  },
  {
    timestamps: true,
  },
);

export const Message = mongoose.model("Message",messageSchema)