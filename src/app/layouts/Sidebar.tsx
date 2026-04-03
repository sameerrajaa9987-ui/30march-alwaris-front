import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { MENU, type MenuItem } from "./menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar as UiSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function Sidebar() {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const isPathActive = (path?: string) => {
    if (!path) return false;
    if (path === "/") return location.pathname === "/";
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const isItemActive = (item: MenuItem): boolean => {
    if (isPathActive(item.to)) return true;
    return item.children?.some(isItemActive) ?? false;
  };

  return (
    <UiSidebar collapsible="offcanvas">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground">
        <div className="flex h-10 items-center justify-between px-2">
          <div className="text-sm font-semibold tracking-wide">Alwaris ERP</div>
          <div className="text-xs text-sidebar-primary-foreground/70">
            Logistics
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {MENU.map((section) => {
          const children = section.children ?? [];
          const hasChildren = children.length > 0;
          const sectionIsActive = isItemActive(section);

          if (hasChildren) {
            const isOpen = openSections[section.label] ?? sectionIsActive;

            return (
              <Collapsible
                key={section.label}
                open={isOpen}
                onOpenChange={(open) =>
                  setOpenSections((prev) => ({
                    ...prev,
                    [section.label]: open,
                  }))
                }
                className="group/collapsible"
              >
                <SidebarGroup>
                  <SidebarGroupLabel className="p-0">
                    <CollapsibleTrigger className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-left hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      {section.icon ? (
                        <section.icon className="h-4 w-4" />
                      ) : null}
                      <span>{section.label}</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>

                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {children.map((item) => (
                          <SidebarMenuItem key={item.label}>
                            {item.children?.length ? (
                              <Collapsible
                                open={
                                  openSubmenus[item.label] ?? isItemActive(item)
                                }
                                onOpenChange={(open) =>
                                  setOpenSubmenus((prev) => ({
                                    ...prev,
                                    [item.label]: open,
                                  }))
                                }
                                className="group/submenu"
                              >
                                <CollapsibleTrigger className="w-full">
                                  <SidebarMenuButton
                                    isActive={isItemActive(item)}
                                    tooltip={item.label}
                                    render={<div />}
                                  >
                                    {item.icon ? (
                                      <item.icon className="h-4 w-4" />
                                    ) : null}
                                    <span>{item.label}</span>
                                    <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/submenu:rotate-90" />
                                  </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                  <SidebarMenuSub>
                                    {item.children
                                      .filter((child) => child.to)
                                      .map((child) => (
                                        <SidebarMenuSubItem
                                          key={`${item.label}-${child.label}`}
                                        >
                                          <SidebarMenuSubButton
                                            render={
                                              <NavLink to={child.to!} end />
                                            }
                                            isActive={isPathActive(child.to)}
                                          >
                                            <span>{child.label}</span>
                                          </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                      ))}
                                  </SidebarMenuSub>
                                </CollapsibleContent>
                              </Collapsible>
                            ) : item.to ? (
                              <SidebarMenuButton
                                render={<NavLink to={item.to} end />}
                                isActive={isPathActive(item.to)}
                                tooltip={item.label}
                              >
                                {item.icon ? (
                                  <item.icon className="h-4 w-4" />
                                ) : null}
                                <span>{item.label}</span>
                              </SidebarMenuButton>
                            ) : null}
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            );
          }

          return section.to ? (
            <SidebarGroup key={section.label}>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      render={<NavLink to={section.to} end />}
                      isActive={sectionIsActive}
                      tooltip={section.label}
                    >
                      {section.icon ? (
                        <section.icon className="h-4 w-4" />
                      ) : null}
                      <span>{section.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ) : null;
        })}
      </SidebarContent>
      <SidebarRail />
    </UiSidebar>
  );
}
