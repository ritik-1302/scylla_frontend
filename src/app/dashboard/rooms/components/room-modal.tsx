/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/interfaces/user-interface";
import { Room } from "@/interfaces/room-interface";
interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  room?: Room | null;
  currentUser: User;
  onSave: (room: Room) => void;
}

export function RoomModal({
  isOpen,
  onClose,
  room,
  currentUser,
  onSave,
}: RoomModalProps) {
  const [editMode, setEditMode] = useState(!room);
  const [formData, setFormData] = useState<Room>({
    id: "",
    number: "",
    type: "Standard",
    status: "available",
    lastCleaned: "",
    nextReservation: null,
  });

  useEffect(() => {
    if (room) {
      setFormData(room);
      setEditMode(false);
    } else {
      setFormData({
        id: `R${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
        number: "",
        type: "Standard",
        status: "available",
        lastCleaned: new Date().toISOString().split("T")[0],
        nextReservation: null,
      });
      setEditMode(true);
    }
  }, [room]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{room ? `Room ${room.number}` : "New Room"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="number">Room Number</Label>
            <Input
              id="number"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Room Type</Label>
            <Select
              name="type"
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev) => {
                    return { ...prev, type: value as Room["type"] };
                })
              }
              disabled={!editMode}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Deluxe">Deluxe</SelectItem>
                <SelectItem value="Suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  status: value as Room["status"],
                }))
              }
              disabled={!editMode}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastCleaned">Last Cleaned</Label>
            <Input
              id="lastCleaned"
              name="lastCleaned"
              type="date"
              value={formData.lastCleaned}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nextReservation">Next Reservation</Label>
            <Input
              id="nextReservation"
              name="nextReservation"
              type="date"
              value={formData.nextReservation || ""}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          {editMode && (
            <Button type="submit" className="w-full">
              {room ? "Update Room" : "Add Room"}
            </Button>
          )}
        </form>
        {room && !editMode && (
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => setEditMode(true)}>Edit</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
