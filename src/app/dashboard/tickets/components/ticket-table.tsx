"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TicketsProps } from "@/interfaces/ticket-interface";
import { User, Info, FileText } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

import { useWebSocket } from "@/context/webSocketContext";

export function TicketTable({ tickets }: TicketsProps) {
  const { sendMessage, webSocketState } = useWebSocket();

  const handleMarkAsClosed = (ticketId: string) => {
    if (webSocketState === WebSocket.OPEN) {
      sendMessage(
        JSON.stringify({
          action: "ticket",
          requestName: "markTicketAsClosed",
          query: {
            ticket: {
              id: ticketId,
            },
          },
        })
      );
    }
  };

  return (
    <Table>
      <TableCaption>A list of your recent Tickets.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Ticket ID</TableHead>
          <TableHead>Room No.</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Device</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <TableRow key={index}>
                <TableCell className="font-medium">{ticket._id}</TableCell>
                <TableCell>202</TableCell>
                <TableCell>{ticket.type}</TableCell>
                <TableCell>{ticket.device.type}</TableCell>
                <TableCell>{ticket.status}</TableCell>
              </TableRow>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ticket</DialogTitle>
                <DialogDescription>{ticket._id}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="flex items-start space-x-2">
                  <User className="w-5 h-5 text-gray-500" />{" "}
                  {/* Icon for Guest Details */}
                  <div>
                    <h3 className="font-semibold mb-2">Guest Details</h3>
                    <p>Room: 201</p>
                    <p>Name: Ritik Shah</p>
                    <p>Contact: 9805278485</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-gray-500" />{" "}
                  {/* Icon for Ticket Info */}
                  <div>
                    <h3 className="font-semibold mb-2">Ticket Info</h3>
                    <p>
                      Created: {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                    <p>Department: {ticket.type}</p>
                    <p>Device: {ticket.device.type}</p>
                    <p>Device-id: {ticket.device._id}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-start space-x-2">
                  <FileText className="w-5 h-5 text-gray-500" />{" "}
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p>Send Housekeeping to the room</p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    onClick={() => handleMarkAsClosed(ticket._id)}
                  >
                    Mark as Closed
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
}
