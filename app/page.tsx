"use client";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
let socket: Socket | null = null;
const page = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const FetchMessages = async () => {
      const res = await fetch("http://localhost:3001/messages");
      const data = await res.json();
      setMessages(data.messages);
    };
    FetchMessages();
  }, [message]);

  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:3001", {
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
      });
    }
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
      socket?.disconnect();
    };
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      socket?.emit("message", message);
      setMessage("");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen flex-col bg-gray-100 p-4">
        <div className="w-full max-w-md" id="input">
          <form onSubmit={(e) => handleSubmit(e)} className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded"
            >
              Send
            </button>
          </form>
        </div>
        {/* msgs */}
        <div className="w-full max-w-md mt-4 space-y-2">
          {messages.map(
            (msg: { _id: string; message: string }, index: number) => (
              <div
                key={msg._id}
                className="p-2 bg-white border border-gray-300 rounded"
              >
                {msg.message}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default page;
