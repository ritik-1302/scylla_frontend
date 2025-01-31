"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomList } from "./room-list";
import { RoomMetrics } from "./room-metrics";
import { RoomModal } from "./room-modal";

import { User } from "@/interfaces/user-interface";
import { Room } from "@/interfaces/room-interface";

export function RoomsView() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userJson = localStorage.getItem("currentUser");
    if (userJson) {
      setCurrentUser(JSON.parse(userJson));
    }

    // Fetch rooms (mock data for now)
    setRooms([
      {
        id: "R101",
        number: "101",
        type: "Standard",
        status: "available",
        lastCleaned: "2024-01-01",
        nextReservation: "2024-01-05",
      },
      {
        id: "R102",
        number: "102",
        type: "Deluxe",
        status: "occupied",
        lastCleaned: "2024-01-02",
        nextReservation: null,
      },
      {
        id: "R103",
        number: "103",
        type: "Suite",
        status: "maintenance",
        lastCleaned: "2023-12-30",
        nextReservation: "2024-01-10",
      },
      // Add more mock rooms here...
    ]);
  }, [router]);

 

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleSaveRoom = (room: Room) => {
    if (selectedRoom) {
      setRooms(rooms.map((r) => (r.id === room.id ? room : r)));
    } else {
      setRooms([...rooms, room]);
    }
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Room Management</h1>
        <Button
          onClick={() => {
            setSelectedRoom(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Room
        </Button>
      </div>
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search rooms..."
          className="max-w-sm"
        />
      </div>
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Room List</TabsTrigger>
          <TabsTrigger value="metrics">Room Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <RoomList
            currentUser={currentUser}
            rooms={rooms}
            onSelectRoom={handleSelectRoom}
          />
        </TabsContent>
        <TabsContent value="metrics">
          <RoomMetrics rooms={rooms} />
        </TabsContent>
      </Tabs>
      <RoomModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRoom(null);
        }}
        room={selectedRoom}
        currentUser={currentUser}
        onSave={handleSaveRoom}
      />
    </div>
  );
}
