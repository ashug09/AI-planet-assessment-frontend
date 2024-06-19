import React, { useEffect, useState } from "react";
import avatar from "../../assets/images/avatar.jpg";
import Image from "next/image";
import { IoAddCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";
export default function SideNav() {
  const [chats, setChats] = useState([]);
  const router = useRouter();
  useEffect(() => {
    handleFetch();
  }, []);
  const handleFetch = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FE_URI}/api/chatName`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      console.log("Chat history retrieved successfully");
      const data = await response.json();
      console.log(data.data);
      setChats(data.data);
    } else {
      console.error("Failed to save chat history retrival");
    }
  };
  return (
    <div className="relative pt-2 mx-2 w-[15%] h-screen shadow-lg bg-white">
      {/* footer of side bar  */}
      <div className="absolute bottom-1 p-1 flex flex-col  w-full ">
        <div className="flex justify-between bg-blue-100">
          <Image src={avatar} className="rounded-full" height={50} width={50} />
          <h1 className="my-auto text-lg">Ashu</h1>
        </div>
      </div>
      {/* new chat button  */}
      <div onClick={() => router.push("/")} className="flex justify-between mx-2 mb-2 rounded-xl px-5 py-2 cursor-pointer bg-gray-200 hover:bg-gray-300">
        <IoAddCircleOutline size={28} />
        <h1 className="my-auto">New Chat</h1>
      </div>

      <h1 className="text-lg mx-2 mb-2 pt-2 border-t-2 border-gray-500">
        Recent Chats
      </h1>

      {chats.map((chat) => (
        <div
          onClick={() =>
            router.push({
              pathname: `/components/chatHistory/chatHistory`,
              query: { id: chat._id },
            })
          }
          className="mx-2 my-2 rounded-xl px-5 py-2 cursor-pointer bg-gray-200 hover:bg-gray-300"
          key={chat._id}
        >
          <h1 className="my-auto truncate">{chat.chatName}</h1>
        </div>
      ))}
    </div>
  );
}
