import dbConnect from "./db/index";
import ChatHistory from "./model/chat.model";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const chatName = await ChatHistory.find({}).select("chatName");
        res.status(200).json({ success: true, data: chatName });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "POST":
      try {
        const { id } = req.body;
        const chatHistory = await ChatHistory.findById(id);
        res.status(200).json({ success: true, data: chatHistory });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
