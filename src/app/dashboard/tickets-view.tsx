"use client";
import { TicketsProps } from "@/interfaces/ticket-interface";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContent from "./components/tab-content";
export default function TicketsView({ tickets }: TicketsProps) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
      </div>
      <Tabs defaultValue="allDepartments">
        <TabsList className="grid w-2/5 grid-cols-4">
          <TabsTrigger value="allDepartments">All Departments</TabsTrigger>
          <TabsTrigger value="frontDesk">Front Desk</TabsTrigger>
          <TabsTrigger value="housekeeping">Housekeeping</TabsTrigger>
          <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
        </TabsList>
        <TabContent value="allDepartments" tickets={tickets} />
        <TabContent value="frontDesk" tickets={tickets.filter((ticket)=>ticket.type==="Frontdesk")} />
        <TabContent value="housekeeping" tickets={tickets.filter((ticket)=>ticket.type==="Housekeeping")} />
        <TabContent value="kitchen" tickets={tickets.filter((ticket)=>ticket.type==="Kitchen")} />
      </Tabs>
    </div>
  );
}
