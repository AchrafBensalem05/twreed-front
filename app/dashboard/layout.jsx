
import Navbar from "@/components/dashboard/navbar";
import { SidebarNav } from "@/components/sidebar-nav";
import React from "react";

// Dashboard navigation items
const dashboardNavItems = [
    { title: "Overview", href: "/dashboard" },
    { title: "Orders", href: "/dashboard/orders" },
    { title: "Products", href: "/dashboard/products" },
    { title: "Settings", href: "/dashboard/settings" },
    // Add more as needed
];

export default function DashboardLayout({ children }) {
    return (
        <div className="flex flex-col h-screen container mx-auto">
            {/* Navbar */}
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (desktop) */}
                <aside className="hidden md:flex shrink-0 border-r bg-white">
                    <SidebarNav items={dashboardNavItems} className="py-6 px-4" />
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
} 