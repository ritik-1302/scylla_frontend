"use client"
import * as React from "react"
import {
  Bolt,
  CarTaxiFront,
  Command,
  Hotel,
  Settings2,
  Waves,
  WavesLadder,
} from "lucide-react"

import { NavMain } from "@/app/dashboard/components/nav-main"
import { NavProjects } from "@/app/dashboard/components/nav-projects"
import { NavUser } from "@/app/dashboard/components/nav-user"
import { ModeToggle } from "./dark-mode-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"
const data = {
  user: {
    name: "Admin",
    email: "admin@scylla.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
  navMain: [
    {
      title: "Resort",
      url: "#",
      icon: Hotel,
      isActive: true,
      items: [
        {
          title: "Tickets",
          url: "#",
        },
  
      ],
    },
    {
      title: "Automation",
      url: "#",
      icon: Bolt,
      items: [
        {
          title: "Whatsapp",
          url: "#",
        },
        {
          title: "Alexa",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Role Assign",
          url: "#",
        },
        {
          title: "Contact",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Spa",
      url: "#",
      icon: Waves,
    },
    {
      name: "Pool",
      url: "#",
      icon: WavesLadder,
    },
    {
      name: "Taxi",
      url: "#",
      icon: CarTaxiFront,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
           <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Scylla</span>
                  <span className="truncate text-xs">Resort</span>
                </div>
                <div>
                  <ModeToggle />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
