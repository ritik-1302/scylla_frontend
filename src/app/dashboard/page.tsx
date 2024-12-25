"use client";
import { useEffect, useState, useRef } from "react";
import { webSocketUrl } from "@/lib/webSocketUrl";
import { AppSidebar } from "@/app/dashboard/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import TicketsView from "./tickets-view";
import { Ticket } from "@/interfaces/ticket-interface";

export default function Page() {
  const [tickets, setTickets] = useState<Ticket[] | []>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!wsRef.current) {
      const ws = new WebSocket(webSocketUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("Connected to WebSocket");
        setLoading(true);
        ws.send(JSON.stringify({ action: "getTickets" }));
      };

      ws.onmessage = (event) => {
        setLoading(true);
        console.log("Message received:", event.data);
        try {
          const data = JSON.parse(event.data);
          // Assuming the message contains a list of tickets
          if (data.tickets) {
            setTickets((prevTickets) => [...prevTickets, ...data.tickets]);
          }
        } catch (error) {
          console.error("Error parsing message data:", error);
        } finally {
          setLoading(false);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      return () => {
        ws.close();
      };
    }
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Tickets</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {loading ? (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        ) : (
          <TicketsView tickets={tickets} />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
