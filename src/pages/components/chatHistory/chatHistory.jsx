import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import SideNav from "../sideNav/sideNav";

export default function ChatHistory() {
  const router = useRouter();
  const { id } = router.query;
  const [history, setHistory] = useState([]);
  useEffect(() => {
    fetchData()
  }, []);
  const fetchData = async ()=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URI}/api/chatName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.data?.chatHistory[0][0].question);
      setHistory(data.data?.chatHistory);
    }
    else{
      console.error("Failed to fetch chat history");
    }

  }
  return (
    <div className="flex">
      {" "}
      <SideNav/>
      <div className="w-full">
      <div className="bg-gray-100 p-5 rounded-lg h-screen overflow-auto">
        {history?.map((item, index) => (
          <div key={index} className="mb-4 w-[70%]">
            <div className="bg-red-200 text-red-800 p-3 rounded-lg shadow-md mb-1">
              {item[0]?.question}
            </div>
            <div className="bg-blue-200 text-blue-800 p-3 rounded-lg shadow-md">
              {item[0]?.answer.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      </div>
    </div>
  );
}
