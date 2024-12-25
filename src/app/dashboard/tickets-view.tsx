"use client";
import { TicketsProps } from "@/interfaces/ticket-interface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardComponenet from "./components/card-component";
import { TableDemo } from "./components/table";

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
        <TabsContent value="allDepartments">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 pt-3 pb-5">
            <CardComponenet />
            <CardComponenet />
            <CardComponenet />
            <CardComponenet />
          </div>
          <div>
            <TableDemo />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
