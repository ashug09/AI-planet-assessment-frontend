import React from "react";

export default function ChatCards({ message, color }) {
  return <div className={`bg-${color}-100  p-2 rounded-lg ml-80 mr-20 my-2`}>{message}</div>;
}
