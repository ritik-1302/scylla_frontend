"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer, Event, View } from "react-big-calendar";
import {format} from "date-fns/format";
import {parse} from "date-fns/parse";
import {startOfWeek} from "date-fns/startOfWeek";
import {getDay} from "date-fns/getDay";
import {enUS} from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Booking } from "@/interfaces/booking-interface";
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface BookingCalendarProps {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
}

export function BookingCalendar({
  bookings,
  onSelectBooking,
}: BookingCalendarProps) {
  const [view, setView] = useState<View>("month");

  const events: Event[] = bookings.map((booking) => ({
    id: booking.id,
    title: `${booking.guestName} - ${booking.roomNumber}`,
    start: new Date(booking.checkIn),
    end: new Date(booking.checkOut),
    resource: booking,
  }));

  const handleSelectEvent = (event: Event) => {
    if (event.resource) {
      onSelectBooking(event.resource as Booking);
    }
  };

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        view={view}
        onView={(newView) => setView(newView)}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={(event) => {
          const booking = event.resource as Booking;
          let backgroundColor = "#3174ad"; // default color
          if (booking.status === "confirmed") {
            backgroundColor = "#4caf50"; // green for confirmed
          } else if (booking.status === "pending") {
            backgroundColor = "#ff9800"; // orange for pending
          } else if (booking.status === "cancelled") {
            backgroundColor = "#f44336"; // red for cancelled
          } else if (booking.status === "checked-in") {
            backgroundColor = "#2196f3"; // blue for checked-in
          } else if (booking.status === "checked-out") {
            backgroundColor = "#9e9e9e"; // grey for checked-out
          }
          return { style: { backgroundColor } };
        }}
      />
    </div>
  );
}
