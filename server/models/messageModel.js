//These model has basically three things

//Name of the sender (who is sending)
//Id of the sender
//Message type
//Reference to the chat which is belong to

import mongoose from "mongoose";

const messageModel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageModel);

export default Message;
