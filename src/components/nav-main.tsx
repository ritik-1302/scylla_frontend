import { type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    badgeCount?: number;
    items?: {
      title: string;
      url: string;
      badgeCount?: number;
      badgeResetFunction?: () => void;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Property</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item?.badgeCount === undefined || item?.badgeCount === 0 ? (
                    <></>
                  ) : (
                    <SidebarMenuBadge className="ml-auto ">
                      <Badge className="bg-sidebar-primary">
                        {item?.badgeCount}
                      </Badge>
                    </SidebarMenuBadge>
                  )}

                  {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        onClick={subItem?.badgeResetFunction}
                      >
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                          {subItem?.badgeCount === undefined ||
                          subItem?.badgeCount === 0 ? (
                            <></>
                          ) : (
                            <SidebarMenuBadge>
                              <Badge className="dark:bg-sidebar-primary">
                                {subItem?.badgeCount}
                              </Badge>
                            </SidebarMenuBadge>
                          )}
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
