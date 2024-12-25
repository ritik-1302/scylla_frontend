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
import { ScrollArea } from "@/components/ui/scroll-area";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TableDemo() {
  const handleOnClick = () => {
    console.log("clicked");
  };
  return (
    <Table>
      <TableCaption>A list of your recent Tickets.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Ticket</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <TableRow key={invoice.invoice} onClick={handleOnClick}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
              </TableRow>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ticket</DialogTitle>
                <DialogDescription># 1234556</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Guest Details</h3>
                    <p>Room: 201</p>
                    <p>Name: Ritik Shah</p>
                    <p>Contact: 9805278485</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Ticket Info</h3>
                    <p>Created: 2024-01-10 02:15 PM</p>
                    <p>Department: House Keeping</p>
                    <p>Priority: low</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Description</h3>
                  <p>Hello this is description</p>
                </div>
                <h3 className="font-semibold">Activity Log</h3>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  {/* {ticket.activityLog.map((activity, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-muted-foreground">
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="mt-1">{activity.content}</p>
                    </div>
                  ))} */}
                </ScrollArea>
              </div>

              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
}
