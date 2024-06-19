import mongoose from "mongoose";

const ChatHistorySchema = new mongoose.Schema({
  userEmail: { type: String },
  chatName: { type: String },
  chatHistory: { type: [Array] },
});

const ChatHistory =
  mongoose.models.ChatHistory ||
  mongoose.model("ChatHistory", ChatHistorySchema);

export default ChatHistory;
