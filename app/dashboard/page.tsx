"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Phone, Video, MoreVertical } from "lucide-react";

interface Contact {
  name: string;
  image: string;
  status?: "online" | "offline";
  lastMessage?: string;
  lastMessageTime?: string;
}

const Page = () => {
  const [query, setQuery] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([
    {
      name: "John Doe",
      image: "https://api.dicebear.com/6.x/avataaars/svg?seed=John",
      status: "online",
      lastMessage: "Hey, how are you?",
      lastMessageTime: "2min ago",
    },
    {
      name: "Jane Smith",
      image: "https://api.dicebear.com/6.x/avataaars/svg?seed=Jane",
      status: "offline",
      lastMessage: "See you later!",
      lastMessageTime: "5min ago",
    },
    {
      name: "Bob Johnson",
      image: "https://api.dicebear.com/6.x/avataaars/svg?seed=Bob",
      status: "online",
      lastMessage: "Let's catch up soon.",
      lastMessageTime: "10min ago",
    },
    {
      name: "Alice Brown",
      image: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alice",
      status: "offline",
      lastMessage: "Good night!",
      lastMessageTime: "15min ago",
    },
  ]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    // Add message sending logic here
    setCurrentMessage("");
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-gray-800 bg-gray-900/50">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search contacts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-5rem)]">
          {contacts.map((contact) => (
            <div
              key={contact.name}
              onClick={() => setSelectedContact(contact)}
              className={`p-3 flex items-center gap-3 hover:bg-gray-800/50 cursor-pointer transition-colors ${
                selectedContact?.name === contact.name ? "bg-gray-800/50" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={contact.image}
                  alt={contact.name}
                  className="h-12 w-12 rounded-full"
                />
                {contact.status === "online" && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-900" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-white font-medium truncate">
                    {contact.name}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {contact.lastMessageTime}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-800 bg-gray-900/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={selectedContact.image}
                alt={selectedContact.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h2 className="text-white font-medium">
                  {selectedContact.name}
                </h2>
                <p className="text-sm text-gray-400">
                  {selectedContact.status}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            {/* Add messages here */}
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-800 bg-gray-900/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type a message..."
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">Select a contact to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default Page;
