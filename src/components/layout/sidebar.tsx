"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "", icon: "LayoutDashboard" },
  { label: "Ideas", href: "/ideas", icon: "Lightbulb" },
  { label: "Tasks", href: "/tasks", icon: "CheckSquare" },
  { label: "Timeline", href: "/timeline", icon: "Clock" },
  { label: "Submission", href: "/submission", icon: "FileText" },
  { label: "Files", href: "/files", icon: "Upload" },
  { label: "Team", href: "/team", icon: "Users" },
  { label: "Settings", href: "/settings", icon: "Settings" },
];

export function Sidebar({ workspaceId }: { workspaceId: string }) {
  const pathname = usePathname();
  const basePath = `/workspace/${workspaceId}`;

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 min-h-screen p-4">
      <div className="mb-8">
        <Link href="/dashboard" className="text-xl font-bold">
          Pilot
        </Link>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const href = `${basePath}${item.href}`;
          const isActive = pathname === href;
          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm font-medium transition",
                isActive
                  ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
