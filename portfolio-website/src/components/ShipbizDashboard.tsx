"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Ship,
  Wrench,
  Users,
  Package,
  BarChart3,
  FileText,
  Settings,
  ChevronRight,
  ChevronDown,
  Home,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

interface MenuItem {
  key: string;
  icon: React.ElementType;
  label: string;
  labelEn: string;
  children?: { key: string; label: string; labelEn: string }[];
}

const menuData: MenuItem[] = [
  {
    key: "dashboard",
    icon: Home,
    label: "我的任务",
    labelEn: "My Tasks",
  },
  {
    key: "ship",
    icon: Ship,
    label: "船舶管理",
    labelEn: "Ship Management",
    children: [
      { key: "ship-info", label: "船舶信息", labelEn: "Ship Info" },
      { key: "ship-equipment", label: "船舶设备", labelEn: "Equipment" },
      { key: "ship-cert", label: "船舶证书", labelEn: "Certificates" },
      { key: "ship-maint", label: "船舶维保", labelEn: "Maintenance" },
    ],
  },
  {
    key: "maintenance",
    icon: Wrench,
    label: "维修保养",
    labelEn: "Maintenance",
    children: [
      { key: "maint-plan", label: "检验计划", labelEn: "Inspection Plan" },
      { key: "work-order", label: "工作卡", labelEn: "Work Orders" },
      { key: "repair-order", label: "维修工单", labelEn: "Repair Orders" },
      { key: "stock", label: "库存管理", labelEn: "Inventory" },
    ],
  },
  {
    key: "purchase",
    icon: Package,
    label: "采购管理",
    labelEn: "Procurement",
    children: [
      { key: "purchase-apply", label: "采购申请", labelEn: "Purchase Apply" },
      { key: "purchase-approval", label: "采购审批", labelEn: "Approval" },
      { key: "supplier", label: "供应商", labelEn: "Suppliers" },
    ],
  },
  {
    key: "crew",
    icon: Users,
    label: "船员管理",
    labelEn: "Crew Management",
    children: [
      { key: "crew-list", label: "船员名单", labelEn: "Crew List" },
      { key: "crew-cert", label: "船员证书", labelEn: "Certificates" },
      { key: "crew-salary", label: "薪资管理", labelEn: "Salary" },
    ],
  },
  {
    key: "board",
    icon: BarChart3,
    label: "数据看板",
    labelEn: "Dashboard",
    children: [
      { key: "maint-board", label: "维保看板", labelEn: "Maint. Board" },
      { key: "cost-analysis", label: "费用分析", labelEn: "Cost Analysis" },
    ],
  },
  {
    key: "documents",
    icon: FileText,
    label: "体系文件",
    labelEn: "Documents",
  },
  {
    key: "system",
    icon: Settings,
    label: "系统配置",
    labelEn: "System Config",
  },
];

// Mock data for dashboard
const mockStats = [
  { label: "船舶总数", labelEn: "Total Ships", value: 24, color: "bg-blue-500" },
  { label: "在航船舶", labelEn: "Sailing", value: 18, color: "bg-green-500" },
  { label: "待维修", labelEn: "Pending Repair", value: 6, color: "bg-orange-500" },
  { label: "本月采购", labelEn: "Monthly Purchase", value: 42, color: "bg-purple-500" },
];

const mockTodoList = [
  { id: 1, title: "船舶检验计划审批", titleEn: "Ship inspection plan approval", type: "审批", typeEn: "Approval", urgent: true, date: "2024-05-15" },
  { id: 2, title: "设备维保申请", titleEn: "Equipment maintenance application", type: "申请", typeEn: "Apply", urgent: false, date: "2024-05-16" },
  { id: 3, title: "采购订单审核", titleEn: "Purchase order review", type: "审核", typeEn: "Review", urgent: true, date: "2024-05-14" },
  { id: 4, title: "船员证书到期提醒", titleEn: "Crew cert expiry reminder", type: "提醒", typeEn: "Reminder", urgent: false, date: "2024-05-20" },
  { id: 5, title: "月度维保报告", titleEn: "Monthly maintenance report", type: "报告", typeEn: "Report", urgent: false, date: "2024-05-31" },
];

const mockShipList = [
  { name: "MS Ocean Star", type: "散货船", typeEn: "Bulk Carrier", status: "在航", statusEn: "Sailing", lastPort: "Shanghai", nextPort: "Singapore" },
  { name: "MS Pacific Wave", type: "集装箱船", typeEn: "Container", status: "在港", statusEn: "In Port", lastPort: "Rotterdam", nextPort: "Hamburg" },
  { name: "MS Atlantic Eagle", type: "油轮", typeEn: "Tanker", status: "维修", statusEn: "Repair", lastPort: "Dubai", nextPort: "-" },
  { name: "MS Arctic Wind", type: "LNG船", typeEn: "LNG Carrier", status: "在航", statusEn: "Sailing", lastPort: "Qatar", nextPort: "Japan" },
];

export default function ShipbizDashboard() {
  const { t, lang } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>(["ship"]);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [currentView, setCurrentView] = useState<"dashboard" | "ship-info" | "maintenance">("dashboard");

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    if (key === "dashboard") setCurrentView("dashboard");
    else if (key === "ship-info") setCurrentView("ship-info");
    else if (key === "maint-plan") setCurrentView("maintenance");
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-16" : "w-56"} bg-[#001529] text-white transition-all duration-300 flex-shrink-0 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center justify-center border-b border-white/10">
          {collapsed ? (
            <Ship className="w-6 h-6" />
          ) : (
            <div className="flex items-center gap-2 px-4">
              <Ship className="w-6 h-6" />
              <span className="font-bold text-lg">ShipBiz</span>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {menuData.map((item) => (
            <div key={item.key}>
              <button
                onClick={() => {
                  if (item.children) {
                    toggleOpen(item.key);
                  } else {
                    handleMenuClick(item.key);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1890ff]/20 transition-colors ${
                  selectedKey === item.key ? "bg-[#1890ff]" : ""
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left text-sm">
                      {lang === "zh" ? item.label : item.labelEn}
                    </span>
                    {item.children && (
                      openKeys.includes(item.key) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )
                    )}
                  </>
                )}
              </button>
              {!collapsed && item.children && openKeys.includes(item.key) && (
                <div className="bg-[#000c17]">
                  {item.children.map((child) => (
                    <button
                      key={child.key}
                      onClick={() => handleMenuClick(child.key)}
                      className={`w-full text-left pl-12 pr-4 py-2 text-sm hover:text-[#1890ff] transition-colors ${
                        selectedKey === child.key
                          ? "text-[#1890ff]"
                          : "text-white/70"
                      }`}
                    >
                      {lang === "zh" ? child.label : child.labelEn}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-10 flex items-center justify-center border-t border-white/10 hover:bg-white/5"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 rotate-90" />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-white shadow-sm flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">{t("返回作品集", "Back to Portfolio")}</span>
            </Link>
            <div className="w-px h-6 bg-slate-200" />
            <h1 className="text-lg font-semibold text-slate-800">
              {t("船务管理平台", "Ship Management Platform")}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">{t("管理员", "Admin")}: 郭贵南</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              郭
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {currentView === "dashboard" && <DashboardView lang={lang} />}
          {currentView === "ship-info" && <ShipInfoView lang={lang} />}
          {currentView === "maintenance" && <MaintenanceView lang={lang} />}
        </div>
      </main>
    </div>
  );
}

function DashboardView({ lang }: { lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{lang === "zh" ? stat.label : stat.labelEn}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <Ship className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Todo List & Ship Status */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Todo List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">
              {lang === "zh" ? "待办事项" : "To-Do List"}
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {mockTodoList.map((todo) => (
              <div key={todo.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50">
                <div className={`w-2 h-2 rounded-full ${todo.urgent ? "bg-red-500" : "bg-blue-500"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">
                    {lang === "zh" ? todo.title : todo.titleEn}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {todo.date} · {lang === "zh" ? todo.type : todo.typeEn}
                  </p>
                </div>
                {todo.urgent && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">
                    {lang === "zh" ? "紧急" : "Urgent"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ship Status */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">
              {lang === "zh" ? "船舶状态" : "Ship Status"}
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {mockShipList.map((ship) => (
              <div key={ship.name} className="px-6 py-4 hover:bg-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{ship.name}</p>
                    <p className="text-xs text-slate-500">
                      {lang === "zh" ? ship.type : ship.typeEn} · {ship.lastPort} → {ship.nextPort}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs rounded ${
                      ship.status === "在航" || ship.statusEn === "Sailing"
                        ? "bg-green-100 text-green-600"
                        : ship.status === "维修" || ship.statusEn === "Repair"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {lang === "zh" ? ship.status : ship.statusEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ShipInfoView({ lang }: { lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "船舶信息列表" : "Ship Information"}
          </h3>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
            {lang === "zh" ? "新增船舶" : "Add Ship"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "船名" : "Ship Name"}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "类型" : "Type"}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "状态" : "Status"}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "上一港" : "Last Port"}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "下一港" : "Next Port"}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "操作" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockShipList.map((ship) => (
                <tr key={ship.name} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">{ship.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{lang === "zh" ? ship.type : ship.typeEn}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      ship.status === "在航" ? "bg-green-100 text-green-600" :
                      ship.status === "维修" ? "bg-orange-100 text-orange-600" :
                      "bg-blue-100 text-blue-600"
                    }`}>
                      {lang === "zh" ? ship.status : ship.statusEn}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{ship.lastPort}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{ship.nextPort}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-500 hover:text-blue-600 text-sm">{lang === "zh" ? "详情" : "Detail"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function MaintenanceView({ lang }: { lang: string }) {
  const maintData = [
    { name: "MS Ocean Star", plan: "年度检验", planEn: "Annual Survey", status: "进行中", statusEn: "In Progress", progress: 65 },
    { name: "MS Pacific Wave", plan: "中间检验", planEn: "Intermediate Survey", status: "待开始", statusEn: "Pending", progress: 0 },
    { name: "MS Atlantic Eagle", plan: "坞修", planEn: "Dock Repair", status: "已完成", statusEn: "Completed", progress: 100 },
    { name: "MS Arctic Wind", plan: "特别检验", planEn: "Special Survey", status: "进行中", statusEn: "In Progress", progress: 30 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "本月计划", labelEn: "Monthly Plan", value: 12, color: "bg-blue-500" },
          { label: "已完成", labelEn: "Completed", value: 8, color: "bg-green-500" },
          { label: "进行中", labelEn: "In Progress", value: 4, color: "bg-orange-500" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">{lang === "zh" ? stat.label : stat.labelEn}</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
            <div className={`h-1 ${stat.color} rounded-full mt-3`} />
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "维保计划列表" : "Maintenance Plans"}
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {maintData.map((item) => (
            <div key={item.name} className="px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">{lang === "zh" ? item.plan : item.planEn}</p>
                </div>
                <span className={`px-2 py-0.5 text-xs rounded ${
                  item.status === "已完成" ? "bg-green-100 text-green-600" :
                  item.status === "进行中" ? "bg-blue-100 text-blue-600" :
                  "bg-orange-100 text-orange-600"
                }`}>
                  {lang === "zh" ? item.status : item.statusEn}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    item.progress === 100 ? "bg-green-500" :
                    item.progress > 0 ? "bg-blue-500" : "bg-slate-300"
                  }`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
