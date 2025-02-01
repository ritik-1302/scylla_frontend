import { Ticket } from "@/interfaces/ticket-interface";
import { TabsContent } from "@/components/ui/tabs";
import StatsCard from "./stats-card";
import { TicketTable } from "./ticket-table";

interface TabContentProps {
  value: string;
  tickets: Ticket[];
}
export default function TabContent({ value, tickets }: TabContentProps) {
  return (
    <TabsContent value={value}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 pt-3 pb-5">
        <StatsCard
          headingText="Total Tickets"
          numTickets={tickets.length.toString()}
        />
        <StatsCard
          headingText="Open Tickets"
          numTickets={tickets
            .filter((ticket) => ticket.status == "Open")
            .length.toString()}
        />
        <StatsCard
          headingText="Closed Today"
          numTickets={tickets
            .filter((ticket) => ticket.status == "Closed")
            .length.toString()}
        />
        <StatsCard
          headingText="Overdue"
          numTickets={tickets
            .filter((ticket) => {
              const createdDate = new Date(ticket.createdAt);
              const currentDate = new Date();

              const differenceInMs =
                currentDate.getTime() - createdDate.getTime();

              //differnece in minutes
              const differenceInMinutes = Math.floor(
                differenceInMs / (1000 * 60)
              );
              if (differenceInMinutes > 10 && ticket.status === "Open") {
                return true;
              } else {
                return false;
              }
            })
            .length.toString()}
        />
      </div>
      <div>
        <TicketTable
          tickets={tickets.filter((ticket) => ticket.status == "Open")}
        />
      </div>
    </TabsContent>
  );
}
