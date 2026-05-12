"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StatCard from "./StatCard";
import SalesChart from "./SalesChart";
import RecentOrders from "./RecentOrders";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    icon: DollarSign,
    color: "bg-blue-500",
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+15.2%",
    icon: ShoppingCart,
    color: "bg-green-500",
  },
  {
    title: "Customers",
    value: "1,247",
    change: "+8.4%",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Products",
    value: "456",
    change: "+12.5%",
    icon: Package,
    color: "bg-orange-500",
  },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Dashboard
            </h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </div>

            {/* Charts & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SalesChart />
              <RecentOrders />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
