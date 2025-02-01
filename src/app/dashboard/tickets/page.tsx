"use client";
import { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
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
import Loader from "./components/loader";

import { useWebSocket } from "@/context/webSocketContext";

export default function Page() {
  const { sendMessage, loading, tickets,webSocketState} = useWebSocket();

  useEffect(() => {
    if(webSocketState === WebSocket.OPEN){
      console.log("sending message");
      sendMessage(
        JSON.stringify({
          action: "ticket",
          requestName: "getTickets",
        })
      );

    }else{
      console.log("WebSocket is not open");
    }
    
  }, [webSocketState]);

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
  );
}
