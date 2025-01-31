"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingList } from "./booking-list";
import { BookingCalendar } from "./booking-calender";
import { BookingModal } from "./booking-modal";
import { User } from "@/interfaces/user-interface";
import { Booking } from "@/interfaces/booking-interface";
// Helper function to generate a random booking
const generateBooking = (id: string, date: Date): Booking => {
  const checkIn = new Date(date);
  const checkOut = new Date(date);
  checkOut.setDate(checkOut.getDate() + Math.floor(Math.random() * 3) + 1); // Stay for 1-3 days

  const roomTypes = ["Standard", "Deluxe", "Suite"];
  const statuses = [
    "pending",
    "confirmed",
    "checked-in",
    "checked-out",
  ] as const;
  const paymentStatuses = ["paid", "partially_paid", "unpaid"] as const;

  const roomCost = Math.floor(Math.random() * 300) + 100;
  const taxes = Math.floor(roomCost * 0.1);
  const extras = Math.floor(Math.random() * 50);

  return {
    id,
    guestName: `Guest ${id}`,
    roomNumber: `${Math.floor(Math.random() * 4) + 1}${
      Math.floor(Math.random() * 20) + 1
    }`.padStart(3, "0"),
    roomType: roomTypes[Math.floor(Math.random() * roomTypes.length)],
    checkIn: checkIn.toISOString().split("T")[0],
    checkOut: checkOut.toISOString().split("T")[0],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    paymentStatus:
      paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
    totalAmount: roomCost + taxes + extras,
    charges: {
      roomCost,
      taxes,
      extras,
    },
  };
};

export default function BookingsView() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userJson = localStorage.getItem("currentUser");
    if (userJson) {
      setCurrentUser(JSON.parse(userJson));
    }

    // Generate bookings from today to January 5th
    const today = new Date();
    const endDate = new Date("2025-01-05"); // Using 2025 to ensure it's in the future
    const generatedBookings: Booking[] = [];

    for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
      const booking = generateBooking(
        `BK-${generatedBookings.length + 1}`.padStart(6, "0"),
        new Date(d)
      );
      generatedBookings.push(booking);
    }

    setBookings(generatedBookings);
  }, [router]);

 

  const handleSelectBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleSaveBooking = (booking: Booking) => {
    if (selectedBooking) {
      setBookings(bookings.map((b) => (b.id === booking.id ? booking : b)));
    } else {
      setBookings([...bookings, booking]);
    }
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bookings Management</h1>
        <Button
          onClick={() => {
            setSelectedBooking(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> New Booking
        </Button>
      </div>
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search bookings..."
          className="max-w-sm"
        />
      </div>
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <BookingList
            currentUser={currentUser}
            bookings={bookings}
            onSelectBooking={handleSelectBooking}
          />
        </TabsContent>
        <TabsContent value="calendar">
          <BookingCalendar
            bookings={bookings}
            onSelectBooking={handleSelectBooking}
          />
        </TabsContent>
      </Tabs>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBooking(null);
        }}
        booking={selectedBooking}
        currentUser={currentUser}
        onSave={handleSaveBooking}
      />
    </div>
  );
}
