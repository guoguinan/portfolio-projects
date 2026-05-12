"use client";

import { Badge } from "./Badge";

const orders = [
  { id: "#1234", customer: "John Doe", product: "Premium Plan", amount: "$299", status: "completed" },
  { id: "#1235", customer: "Jane Smith", product: "Basic Plan", amount: "$99", status: "pending" },
  { id: "#1236", customer: "Bob Johnson", product: "Enterprise", amount: "$999", status: "processing" },
  { id: "#1237", customer: "Alice Brown", product: "Premium Plan", amount: "$299", status: "completed" },
  { id: "#1238", customer: "Charlie Wilson", product: "Basic Plan", amount: "$99", status: "cancelled" },
];

export default function RecentOrders() {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Orders
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-slate-700">
              <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Order</th>
              <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Customer</th>
              <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Amount</th>
              <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 dark:border-slate-700 last:border-0">
                <td className="py-3 text-sm text-gray-900 dark:text-white">{order.id}</td>
                <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{order.customer}</td>
                <td className="py-3 text-sm text-gray-900 dark:text-white">{order.amount}</td>
                <td className="py-3">
                  <Badge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
