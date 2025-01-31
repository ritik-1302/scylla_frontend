"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChannelPartnerList } from "./channel-partner-list";
import { useEffect,useState } from "react";
import { User } from "@/interfaces/user-interface";
export default function ChannelPartnerView() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    // In a real application, you would fetch the current user from your auth system
    // For now, we'll just simulate a logged-in admin user
    setCurrentUser({
      id: "U-001",
      name: "Admin User",
      role: "admin"
    })
  }, [])

  if (!currentUser) {
    return <div>Loading...</div>
  }
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Channel Partner Management
        </h2>
      </div>
      <div className="relative pb-8">
        <Search className="absolute  text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search partners..."
          className="pl-8"
        />
      </div>
      <ChannelPartnerList currentUser={currentUser}/>
    </div>
  );
}
