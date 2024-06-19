import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import Features from "./features";
import ChatCards from "./chatCards";
import { useFormik } from "formik";
import FileUpload from "./FileUpload";
import linear from "../../assets/images/linear_loader.gif";
import Image from "next/image";
import { useRouter } from "next/router";
export default function NewChat() {
  const router = useRouter()
  const [hide, setHide] = useState("");
  const [chatCardsHide, setChatCardsHide] = useState("hidden");
  const [messages, setMessages] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      file: null,
      text: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const userMessage = { type: "question", content: values.text };
      setMessages([...messages, userMessage]);

      const formData = new FormData();

      formData.append("question", values.text);

      try {
        const askResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BE_URI}/ask/?question=${encodeURIComponent(
            values.text
          )}`
        );

        if (askResponse.ok) {
          const askData = await askResponse.json();
          console.log("Question response:", askData);

          const botMessage = { type: "answer", content: askData.answer };
          setMessages([...messages, userMessage, botMessage]);
          setHide("hidden");
          setChatCardsHide("");
          setLoading(false);
          formik.resetForm();
        } else {
          console.error("Failed to get answer");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    },
  });
  const saveChatHistory = async () => {
    const date = new Date();
    try {
      const messages = await fetch(`${process.env.NEXT_PUBLIC_BE_URI}/history`);
      const data = await messages.json();
      console.log(data.history);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FE_URI}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: "andrew@example.com",
            chatHistory: data?.history,
            chatName: `Chat on ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
          }),
        }
      );
      if (response.ok) {
        console.log("Chat history saved successfully");
        router.reload()
      } else {
        console.error("Failed to save chat history");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="relative bg-white mx-auto pt-5 my-5 w-[75%] rounded-2xl">
        <div className={hide}>
          <Features />
        </div>
        <div
          className={
            "absolute right-2 overflow-auto scrollable-content h-96" +
            chatCardsHide
          }
        >
          {messages.map((msg, index) => (
            <div key={index}>
              <ChatCards
                message={msg.content}
                color={msg.type === "question" ? "red" : "blue"}
              />
            </div>
          ))}
        </div>
        <div className="mx-auto flex justify-center xl:mt-96">
          {!isFileUploaded ? (
            <FileUpload setIsFileUploaded={setIsFileUploaded} />
          ) : (
            <div className="flex justify-evenly absolute bottom-36 ml-28">
              <div className=" bg-yellow-100 w-72 h-16 rounded-full px-5 py-2 left-2/4 -translate-x-2/4">
                {loading ? (
                  <Image
                    src={linear}
                    className="mx-auto"
                    height={50}
                    width={50}
                  />
                ) : (
                  <h1 className="text-center mt-2">Ask me anything!</h1>
                )}
              </div>
              <div
                onClick={() => saveChatHistory()}
                className="bg-purple-100 hover:bg-purple-200 cursor-pointer w-72 h-16 ml-20 rounded-full px-5 py-2 left-2/4 -translate-x-2/4"
              >
                <h1 className="text-center mt-2">Save this chat for later</h1>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="absolute bottom-10 border-2 rounded-full px-5 py-2 w-[80%] left-2/4 -translate-x-2/4">
            <div className="flex justify-between">
              <textarea
                id="text"
                name="text"
                rows={formik.values.text.split("\n").length}
                onChange={formik.handleChange}
                value={formik.values.text}
                placeholder="Type a message..."
                className="w-full focus:border-0 focus:outline-none focus:ring-0"
              />
              <div className="flex">
                {/* <IoMdAttach
                  onClick={() => document.getElementById("file").click()}
                  className="my-auto mx-5 cursor-pointer"
                  color="grey"
                  size={22}
                  title="Attach"
                />
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  className="hidden"
                /> */}
                <button type="submit">
                  <IoSend
                    className="my-auto cursor-pointer ml-8"
                    color="purple"
                    size={20}
                    title="Send"
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
