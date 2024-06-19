import dbConnect from "./db/index";
import ChatHistory from "./model/chat.model";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { userEmail, chatHistory, chatName } = req.body;
        console.log(userEmail, chatName);
        const chatEntry = await ChatHistory.create({
            chatName,
          userEmail,
          chatHistory,
        });
        res.status(201).json({ success: true, data: chatEntry });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "GET":
      try {
        
        const chatHistory = await ChatHistory.find({});
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
