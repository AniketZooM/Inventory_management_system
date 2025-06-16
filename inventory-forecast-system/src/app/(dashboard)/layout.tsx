"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, HelpCircle, LayoutDashboard, List, LogOut, Settings, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarNavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: React.ReactNode;
    variant: "default" | "ghost";
    href: string;
  }[];
}

function SidebarNav({ links, isCollapsed }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
              pathname === link.href
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {link.icon}
            {!isCollapsed && <div>{link.title}</div>}
            {!isCollapsed && link.label && (
              <span className="ml-auto text-xs">{link.label}</span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarLinks = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      variant: "default",
      href: "/dashboard",
    },
    {
      title: "Inventory",
      icon: <List className="h-5 w-5" />,
      variant: "ghost",
      href: "/dashboard/inventory",
    },
    {
      title: "Upload Data",
      icon: <Upload className="h-5 w-5" />,
      variant: "ghost",
      href: "/dashboard/upload",
    },
    {
      title: "Forecasts",
      icon: <BarChart3 className="h-5 w-5" />,
      variant: "ghost",
      href: "/dashboard/forecasts",
    },
    {
      title: "Reports",
      icon: <FileText className="h-5 w-5" />,
      variant: "ghost",
      href: "/dashboard/reports",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      variant: "ghost",
      href: "/dashboard/settings",
    },
    {
      title: "Help",
      icon: <HelpCircle className="h-5 w-5" />,
      variant: "ghost",
      href: "/dashboard/help",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navbar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mr-2"
          >
            <List className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <span className="text-lg font-semibold">LSTM Inventory System</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            isCollapsed ? "w-16" : "w-64"
          } border-r bg-background transition-all duration-200 ease-in-out`}
        >
          <SidebarNav links={sidebarLinks} isCollapsed={isCollapsed} />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
