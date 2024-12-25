"use client";
import { TicketProp } from "@/interfaces/ticket-interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Check, BellRing } from "lucide-react";

export default function TicketComponent({ticket}:TicketProp) {

  const handleMarkAsRead = () => {
    // I want to call webSocket here 

  };



  return (
    <Card>
      <CardHeader>
        <CardTitle>{ticket.type} Request</CardTitle>
        <CardDescription>Guest Requested for Housekeeping</CardDescription>
        <CardDescription>#  {ticket._id}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Device Type {ticket.device.type}
            </p>
            <p className="text-sm text-muted-foreground">
              {ticket.device.identifier.slice(0,20)} ....
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleMarkAsRead}>
          <Check /> Mark  as read
        </Button>
      </CardFooter>
    </Card>
  );
}
