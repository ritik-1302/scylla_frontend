import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationComponent from "./ConversationComponent";
import {  Search } from "lucide-react";
import { Input } from "@/components/ui/input";
export default function ConversationsView() {
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Sure, I'll send it over soon!",
      time: new Date(),
      unread: 2,
      online: true,
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 2,
      name: "Tech Team",
      lastMessage: "Meeting starts in 10 minutes",
      time: new Date(),
      unread: 0,
      online: false,
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 3,
      name: "David Smith",
      lastMessage: "Thanks for your help!",
      time: new Date(),
      unread: 0,
      online: true,
      avatar: "/api/placeholder/32/32",
    },
    // Added more conversations to show scrolling
    {
      id: 4,
      name: "Marketing Team",
      lastMessage: "New campaign draft ready",
      time: new Date(),
      unread: 5,
      online: true,
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 5,
      name: "Alice Williams",
      lastMessage: "Let's catch up tomorrow",
      time: new Date(),
      unread: 0,
      online: false,
      avatar: "/api/placeholder/32/32",
    },
  ];
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Chats</h2>
      </div>
      <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search conversations..." 
            className="pl-8 w-full"
          />
        </div>
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {conversations.map((conversation, index) => (
            <ConversationComponent
              key={index}
              id={conversation.id}
              name={conversation.name}
              lastMessage={conversation.lastMessage}
              avatar={conversation.avatar}
              time={conversation.time}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
