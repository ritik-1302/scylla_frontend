"use client";
import { useEffect, useState, useRef } from "react";
import { webSocketUrl } from "@/lib/web-socket-url";
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
import TicketsView from "./components/tickets-view";
import { Ticket } from "@/interfaces/ticket-interface";
import Loader from "./components/loader";

import { WebSocketContext } from "@/hooks/use-web-socket";

// WebSocket context

export default function Page() {
  const [tickets, setTickets] = useState<Ticket[] | []>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const [loading, setLoading] = useState(true);
  const reconnectRef = useRef(false);
  const pingIntervalRef = useRef<number | null>(null);

  const connectWebSocket = () => {
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      const ws = new WebSocket(webSocketUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("Connected to WebSocket");
        setLoading(true);
        ws.send(
          JSON.stringify({
            action: "ticket",
            requestName: "getTickets",
          })
        );
        reconnectRef.current = false; // Reset reconnect flag

        // Start pinging the server every 30 seconds
        pingIntervalRef.current = window.setInterval(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(
              JSON.stringify({ action: "default", message: "hello" })
            );
            console.log("Ping sent");
          }
        }, 30000); // 30 seconds ping interval
      };

      ws.onmessage = (event) => {
        console.log("Message received:", event.data);
        try {
          const data = JSON.parse(event.data);
          // Assuming the message contains a list of tickets
          if (data.tickets) {
            if (data.tickets.length == 1) {
              setTickets((prevTickets) => [...data.tickets, ...prevTickets]);
            } else {
              setTickets([...data.tickets]);
            }
          }
        } catch (error) {
          console.error("Error parsing message data:", error);
        } finally {
          setLoading(false);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        ws.close(); // Close the socket and trigger reconnection
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        if (!reconnectRef.current) {
          reconnectRef.current = true;
          setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
        }

        // Clear ping interval if connection is closed
        if (pingIntervalRef.current) {
          clearInterval(pingIntervalRef.current);
          pingIntervalRef.current = null;
        }
      };
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      // Cleanup ping interval on component unmount
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws: wsRef.current }}>
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
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Tickets</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {loading ? <Loader /> : <TicketsView tickets={tickets} />}
        </SidebarInset>
      </SidebarProvider>
    </WebSocketContext.Provider>
  );
}
