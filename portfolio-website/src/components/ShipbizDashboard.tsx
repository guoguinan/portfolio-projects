"use client";

import { useState, useEffect } from "react";
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
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Bell,
  AlertTriangle,
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
  {
    name: "MS Ocean Star",
    nameEn: "MS Ocean Star",
    type: "散货船",
    typeEn: "Bulk Carrier",
    status: "在航",
    statusEn: "Sailing",
    lastPort: "Shanghai",
    nextPort: "Singapore",
    imo: "IMO9801234",
    mmsi: "412345678",
    callSign: "BPAK6",
    flag: "中国",
    flagEn: "China",
    grossTonnage: 45000,
    netTonnage: 28000,
    deadweight: 82000,
    length: 229,
    width: 32.26,
    draft: 14.5,
    buildYear: 2018,
    classSociety: "CCS",
    classSocietyEn: "CCS",
    owner: "Ocean Star Shipping Ltd",
    manager: "Ocean Star Management Co.",
    crewCount: 22,
    engineType: "MAN B&W 6S60ME-C8",
    enginePower: 12000,
    vsatStatus: "在线",
    vsatStatusEn: "Online",
    lat: 30.25,
    lon: 122.75,
    speed: 14.2,
    course: 185,
    heading: 183,
    eta: "2024-05-18 08:00",
    positionTime: "2024-05-12 15:30:00",
    fuelRemaining: 850,
    freshWater: 320,
    lastSurvey: "2023-09-15",
    communicationStatus: "正常",
    communicationStatusEn: "Normal",
  },
  {
    name: "MS Pacific Wave",
    nameEn: "MS Pacific Wave",
    type: "集装箱船",
    typeEn: "Container",
    status: "在港",
    statusEn: "In Port",
    lastPort: "Rotterdam",
    nextPort: "Hamburg",
    imo: "IMO9756789",
    mmsi: "235012345",
    callSign: "MJES3",
    flag: "马绍尔群岛",
    flagEn: "Marshall Islands",
    grossTonnage: 190000,
    netTonnage: 118000,
    deadweight: 200000,
    length: 400,
    width: 59,
    draft: 16.0,
    buildYear: 2021,
    classSociety: "DNV",
    classSocietyEn: "DNV",
    owner: "Pacific Wave Shipping Pte Ltd",
    manager: "Pacific Wave Fleet Management",
    crewCount: 25,
    engineType: "MAN B&W 11G95ME-C",
    enginePower: 75000,
    vsatStatus: "在线",
    vsatStatusEn: "Online",
    lat: 53.55,
    lon: 9.97,
    speed: 0,
    course: 0,
    heading: 270,
    eta: "2024-05-15 20:00",
    positionTime: "2024-05-12 14:45:00",
    fuelRemaining: 1200,
    freshWater: 500,
    lastSurvey: "2024-01-20",
    communicationStatus: "正常",
    communicationStatusEn: "Normal",
  },
  {
    name: "MS Atlantic Eagle",
    nameEn: "MS Atlantic Eagle",
    type: "油轮",
    typeEn: "Tanker",
    status: "维修",
    statusEn: "Repair",
    lastPort: "Dubai",
    nextPort: "-",
    imo: "IMO9889012",
    mmsi: "538009876",
    callSign: "V7YX9",
    flag: "巴拿马",
    flagEn: "Panama",
    grossTonnage: 160000,
    netTonnage: 95000,
    deadweight: 320000,
    length: 333,
    width: 60,
    draft: 22.0,
    buildYear: 2015,
    classSociety: "LR",
    classSocietyEn: "Lloyd's Register",
    owner: "Atlantic Eagle Tankers Inc",
    manager: "Atlantic Eagle Marine Services",
    crewCount: 28,
    engineType: "Wärtsilä 7RT-flex84T-D",
    enginePower: 36000,
    vsatStatus: "离线",
    vsatStatusEn: "Offline",
    lat: 25.25,
    lon: 55.28,
    speed: 0,
    course: 0,
    heading: 0,
    eta: "-",
    positionTime: "2024-05-10 09:00:00",
    fuelRemaining: 450,
    freshWater: 180,
    lastSurvey: "2023-06-10",
    communicationStatus: "中断",
    communicationStatusEn: "Disrupted",
  },
  {
    name: "MS Arctic Wind",
    nameEn: "MS Arctic Wind",
    type: "LNG船",
    typeEn: "LNG Carrier",
    status: "在航",
    statusEn: "Sailing",
    lastPort: "Qatar",
    nextPort: "Japan",
    imo: "IMO9912345",
    mmsi: "356890123",
    callSign: "H3VM",
    flag: "巴哈马",
    flagEn: "Bahamas",
    grossTonnage: 130000,
    netTonnage: 78000,
    deadweight: 95000,
    length: 299,
    width: 47,
    draft: 12.5,
    buildYear: 2022,
    classSociety: "ABS",
    classSocietyEn: "ABS",
    owner: "Arctic Wind Energy Transport",
    manager: "Arctic Wind Ship Management",
    crewCount: 26,
    engineType: "MAN B&W 5G70ME-C9.5-GI",
    enginePower: 32000,
    vsatStatus: "在线",
    vsatStatusEn: "Online",
    lat: 10.52,
    lon: 107.82,
    speed: 18.5,
    course: 65,
    heading: 67,
    eta: "2024-05-22 14:00",
    positionTime: "2024-05-12 15:45:00",
    fuelRemaining: 920,
    freshWater: 380,
    lastSurvey: "2023-11-08",
    communicationStatus: "正常",
    communicationStatusEn: "Normal",
  },
];

const mockShipEquipment = [
  { id: "E001", name: "主发动机", nameEn: "Main Engine", ship: "MS Ocean Star", type: "动力设备", typeEn: "Power", status: "正常", statusEn: "Normal", lastMaint: "2024-03-15", nextMaint: "2024-09-15" },
  { id: "E002", name: "辅助发电机", nameEn: "Generator", ship: "MS Pacific Wave", type: "电力设备", typeEn: "Electrical", status: "正常", statusEn: "Normal", lastMaint: "2024-02-20", nextMaint: "2024-08-20" },
  { id: "E003", name: "雷达系统", nameEn: "Radar System", ship: "MS Atlantic Eagle", type: "导航设备", typeEn: "Navigation", status: "维修中", statusEn: "Repairing", lastMaint: "2024-01-10", nextMaint: "2024-07-10" },
  { id: "E004", name: "锚机", nameEn: "Windlass", ship: "MS Arctic Wind", type: "甲板设备", typeEn: "Deck", status: "正常", statusEn: "Normal", lastMaint: "2024-04-01", nextMaint: "2024-10-01" },
];

const mockShipCerts = [
  { id: "C001", name: "船舶国籍证书", nameEn: "Nationality Cert", ship: "MS Ocean Star", issueDate: "2020-05-20", expiryDate: "2025-05-20", status: "有效", statusEn: "Valid" },
  { id: "C002", name: "船级证书", nameEn: "Class Cert", ship: "MS Pacific Wave", issueDate: "2019-08-15", expiryDate: "2024-08-15", status: "即将到期", statusEn: "Expiring Soon" },
  { id: "C003", name: "安全管理证书", nameEn: "SMC", ship: "MS Atlantic Eagle", issueDate: "2021-03-10", expiryDate: "2026-03-10", status: "有效", statusEn: "Valid" },
  { id: "C004", name: "国际载重线证书", nameEn: "Load Line Cert", ship: "MS Arctic Wind", issueDate: "2022-01-05", expiryDate: "2027-01-05", status: "有效", statusEn: "Valid" },
];

const mockWorkOrders = [
  { id: "WO001", title: "主机例行保养", titleEn: "Main Engine Maintenance", ship: "MS Ocean Star", assignee: "张工程师", assigneeEn: "Engineer Zhang", priority: "高", priorityEn: "High", status: "进行中", statusEn: "In Progress", dueDate: "2024-05-20" },
  { id: "WO002", title: "甲板油漆作业", titleEn: "Deck Painting", ship: "MS Pacific Wave", assignee: "李技工", assigneeEn: "Tech Li", priority: "中", priorityEn: "Medium", status: "待分配", statusEn: "Pending", dueDate: "2024-05-25" },
  { id: "WO003", title: "电气系统检修", titleEn: "Electrical Inspection", ship: "MS Atlantic Eagle", assignee: "王电工", assigneeEn: "Electrician Wang", priority: "高", priorityEn: "High", status: "已完成", statusEn: "Completed", dueDate: "2024-05-10" },
  { id: "WO004", title: "消防设备检查", titleEn: "Fire Safety Check", ship: "MS Arctic Wind", assignee: "赵安全员", assigneeEn: "Safety Officer Zhao", priority: "低", priorityEn: "Low", status: "进行中", statusEn: "In Progress", dueDate: "2024-05-30" },
];

const mockRepairOrders = [
  { id: "R001", title: "船体裂缝修补", titleEn: "Hull Crack Repair", ship: "MS Atlantic Eagle", type: "航修", typeEn: "Voyage Repair", cost: 85000, status: "审批中", statusEn: "Approving", applyDate: "2024-05-01" },
  { id: "R002", title: "螺旋桨更换", titleEn: "Propeller Replacement", ship: "MS Ocean Star", type: "厂修", typeEn: "Dock Repair", cost: 320000, status: "已批准", statusEn: "Approved", applyDate: "2024-04-20" },
  { id: "R003", title: "舵机系统维修", titleEn: "Steering Gear Repair", ship: "MS Pacific Wave", type: "航修", typeEn: "Voyage Repair", cost: 156000, status: "已完成", statusEn: "Completed", applyDate: "2024-03-15" },
];

const mockStock = [
  { id: "S001", name: "主机润滑油", nameEn: "Engine Oil", category: "油品", categoryEn: "Oil", quantity: 500, unit: "升", unitEn: "L", minStock: 200, location: "A仓库", locationEn: "Warehouse A" },
  { id: "S002", name: "轴承", nameEn: "Bearing", category: "机械备件", categoryEn: "Mechanical", quantity: 24, unit: "个", unitEn: "pcs", minStock: 10, location: "B仓库", locationEn: "Warehouse B" },
  { id: "S003", name: "密封圈套装", nameEn: "Seal Kit", category: "密封件", categoryEn: "Seal", quantity: 8, unit: "套", unitEn: "set", minStock: 5, location: "A仓库", locationEn: "Warehouse A" },
  { id: "S004", name: "滤芯", nameEn: "Filter", category: "消耗品", categoryEn: "Consumable", quantity: 45, unit: "个", unitEn: "pcs", minStock: 20, location: "C仓库", locationEn: "Warehouse C" },
];

const mockPurchaseApply = [
  { id: "PA001", title: "Q2主机备件采购", titleEn: "Q2 Engine Spares", applicant: "张工程师", applicantEn: "Eng. Zhang", amount: 125000, status: "审批中", statusEn: "Approving", applyDate: "2024-05-05" },
  { id: "PA002", title: "导航设备更新", titleEn: "Nav Equipment Update", applicant: "李船长", applicantEn: "Capt. Li", amount: 280000, status: "已批准", statusEn: "Approved", applyDate: "2024-04-28" },
  { id: "PA003", title: "安全设备补充", titleEn: "Safety Equipment", applicant: "王安全员", applicantEn: "Safety Wang", amount: 45000, status: "已完成", statusEn: "Completed", applyDate: "2024-04-15" },
];

const mockSuppliers = [
  { id: "SUP001", name: "上海船舶设备有限公司", nameEn: "Shanghai Marine Equip", contact: "刘先生", contactEn: "Mr. Liu", phone: "+86-21-5888-9999", email: "sales@shmarine.com", rating: 4.8, cooperation: "5年", cooperationEn: "5 Years" },
  { id: "SUP002", name: "大连海事配件厂", nameEn: "Dalian Marine Parts", contact: "陈女士", contactEn: "Ms. Chen", phone: "+86-411-8666-7777", email: "order@dlmarine.com", rating: 4.5, cooperation: "3年", cooperationEn: "3 Years" },
  { id: "SUP003", name: "Singapore Marine Pte Ltd", nameEn: "Singapore Marine", contact: "John Tan", contactEn: "John Tan", phone: "+65-6789-0123", email: "john@sgmarine.sg", rating: 4.9, cooperation: "7年", cooperationEn: "7 Years" },
];

const mockCrewList = [
  { id: "CR001", name: "李明", nameEn: "Li Ming", position: "船长", positionEn: "Captain", ship: "MS Ocean Star", nationality: "中国", nationalityEn: "China", certExpiry: "2026-08-20", status: "在船", statusEn: "On Board" },
  { id: "CR002", name: "王强", nameEn: "Wang Qiang", position: "大副", positionEn: "Chief Officer", ship: "MS Pacific Wave", nationality: "中国", nationalityEn: "China", certExpiry: "2025-12-15", status: "在船", statusEn: "On Board" },
  { id: "CR003", name: "Tom Johnson", nameEn: "Tom Johnson", position: "轮机长", positionEn: "Chief Engineer", ship: "MS Atlantic Eagle", nationality: "英国", nationalityEn: "UK", certExpiry: "2025-06-30", status: "休假", statusEn: "On Leave" },
  { id: "CR004", name: "张伟", nameEn: "Zhang Wei", position: "二副", positionEn: "2nd Officer", ship: "MS Arctic Wind", nationality: "中国", nationalityEn: "China", certExpiry: "2027-02-10", status: "在船", statusEn: "On Board" },
];

const mockCrewCerts = [
  { id: "CC001", holder: "李明", holderEn: "Li Ming", certType: "船长适任证书", certTypeEn: "Master License", certNo: "BMC2020-001", issueDate: "2020-06-01", expiryDate: "2025-06-01", status: "有效", statusEn: "Valid" },
  { id: "CC002", holder: "王强", holderEn: "Wang Qiang", certType: "大副适任证书", certTypeEn: "Chief Mate License", certNo: "BMC2019-045", issueDate: "2019-09-15", expiryDate: "2024-09-15", status: "即将到期", statusEn: "Expiring" },
  { id: "CC003", holder: "Tom Johnson", holderEn: "Tom Johnson", certType: "轮机长证书", certTypeEn: "Chief Eng. License", certNo: "UK-CE-2018-112", issueDate: "2018-04-20", expiryDate: "2028-04-20", status: "有效", statusEn: "Valid" },
];

const mockCostData = [
  { month: "2024-01", maintCost: 320000, repairCost: 180000, purchaseCost: 450000, fuelCost: 1200000 },
  { month: "2024-02", maintCost: 280000, repairCost: 220000, purchaseCost: 380000, fuelCost: 1150000 },
  { month: "2024-03", maintCost: 350000, repairCost: 150000, purchaseCost: 520000, fuelCost: 1300000 },
  { month: "2024-04", maintCost: 300000, repairCost: 280000, purchaseCost: 410000, fuelCost: 1250000 },
];

type ViewType =
  | "dashboard"
  | "ship-info"
  | "ship-equipment"
  | "ship-cert"
  | "ship-maint"
  | "maintenance"
  | "work-order"
  | "repair-order"
  | "stock"
  | "purchase-apply"
  | "purchase-approval"
  | "supplier"
  | "crew-list"
  | "crew-cert"
  | "crew-salary"
  | "maint-board"
  | "cost-analysis"
  | "documents"
  | "system";

export default function ShipbizDashboard() {
  const { t, lang } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>(["ship"]);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    const viewMap: Record<string, ViewType> = {
      dashboard: "dashboard",
      "ship-info": "ship-info",
      "ship-equipment": "ship-equipment",
      "ship-cert": "ship-cert",
      "ship-maint": "ship-maint",
      "maint-plan": "maintenance",
      "work-order": "work-order",
      "repair-order": "repair-order",
      stock: "stock",
      "purchase-apply": "purchase-apply",
      "purchase-approval": "purchase-approval",
      supplier: "supplier",
      "crew-list": "crew-list",
      "crew-cert": "crew-cert",
      "crew-salary": "crew-salary",
      "maint-board": "maint-board",
      "cost-analysis": "cost-analysis",
      documents: "documents",
      system: "system",
    };
    setCurrentView(viewMap[key] || "dashboard");
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
                    {item.children &&
                      (openKeys.includes(item.key) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      ))}
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
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4 rotate-90" />
          )}
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
              <span className="text-sm">
                {t("返回作品集", "Back to Portfolio")}
              </span>
            </Link>
            <div className="w-px h-6 bg-slate-200" />
            <h1 className="text-lg font-semibold text-slate-800">
              {t("船务管理平台", "Ship Management Platform")}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              {t("管理员", "Admin")}: 郭贵南
            </span>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              郭
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {currentView === "dashboard" && <DashboardView lang={lang} />}
          {currentView === "ship-info" && <ShipInfoView lang={lang} />}
          {currentView === "ship-equipment" && <ShipEquipmentView lang={lang} />}
          {currentView === "ship-cert" && <ShipCertView lang={lang} />}
          {currentView === "ship-maint" && <ShipMaintView lang={lang} />}
          {currentView === "maintenance" && <MaintenanceView lang={lang} />}
          {currentView === "work-order" && <WorkOrderView lang={lang} />}
          {currentView === "repair-order" && <RepairOrderView lang={lang} />}
          {currentView === "stock" && <StockView lang={lang} />}
          {currentView === "purchase-apply" && <PurchaseApplyView lang={lang} />}
          {currentView === "purchase-approval" && <PurchaseApprovalView lang={lang} />}
          {currentView === "supplier" && <SupplierView lang={lang} />}
          {currentView === "crew-list" && <CrewListView lang={lang} />}
          {currentView === "crew-cert" && <CrewCertView lang={lang} />}
          {currentView === "crew-salary" && <CrewSalaryView lang={lang} />}
          {currentView === "maint-board" && <MaintBoardView lang={lang} />}
          {currentView === "cost-analysis" && <CostAnalysisView lang={lang} />}
          {currentView === "documents" && <DocumentsView lang={lang} />}
          {currentView === "system" && <SystemView lang={lang} />}
        </div>
      </main>
    </div>
  );
}

/* ================= Views ================= */

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
                <p className="text-sm text-slate-500">
                  {lang === "zh" ? stat.label : stat.labelEn}
                </p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
              >
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
              <div
                key={todo.id}
                className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    todo.urgent ? "bg-red-500" : "bg-blue-500"
                  }`}
                />
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
                    <p className="text-sm font-medium text-slate-800">
                      {ship.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {lang === "zh" ? ship.type : ship.typeEn} · {ship.lastPort}{" "}
                      → {ship.nextPort}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "船名" : "Ship Name"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "类型" : "Type"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "状态" : "Status"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "上一港" : "Last Port"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "下一港" : "Next Port"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "操作" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockShipList.map((ship) => (
                <tr key={ship.name} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {ship.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? ship.type : ship.typeEn}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        ship.status === "在航"
                          ? "bg-green-100 text-green-600"
                          : ship.status === "维修"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {lang === "zh" ? ship.status : ship.statusEn}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {ship.lastPort}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {ship.nextPort}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-500 hover:text-blue-600 text-sm">
                      {lang === "zh" ? "详情" : "Detail"}
                    </button>
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

function ShipEquipmentView({ lang }: { lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "船舶设备" : "Ship Equipment"}
          </h3>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
            {lang === "zh" ? "新增设备" : "Add Equipment"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "设备编号" : "ID"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "设备名称" : "Name"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "所属船舶" : "Ship"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "类型" : "Type"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "状态" : "Status"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "下次保养" : "Next Maint."}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockShipEquipment.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {lang === "zh" ? item.name : item.nameEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.ship}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? item.type : item.typeEn}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        item.status === "正常"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {lang === "zh" ? item.status : item.statusEn}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {item.nextMaint}
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

function ShipCertView({ lang }: { lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "船舶证书" : "Ship Certificates"}
          </h3>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
            {lang === "zh" ? "新增证书" : "Add Cert"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "证书编号" : "ID"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "证书名称" : "Name"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "船舶" : "Ship"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "签发日期" : "Issue Date"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "到期日期" : "Expiry"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "状态" : "Status"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockShipCerts.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {lang === "zh" ? item.name : item.nameEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.ship}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.issueDate}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.expiryDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        item.status === "有效"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {lang === "zh" ? item.status : item.statusEn}
                    </span>
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

interface ShipMaintRecord {
  id: string;
  shipName: string;
  shipNameEn: string;
  maintType: string;
  maintTypeEn: string;
  description: string;
  descriptionEn: string;
  startDate: string;
  endDate: string;
  cost: number;
  status: string;
  statusEn: string;
}

function useApiData<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(endpoint);
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const addItem = async (item: Omit<T, "id">) => {
    await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
    fetchData();
  };

  const updateItem = async (id: string, updates: Partial<T>) => {
    await fetch(endpoint, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...updates }) });
    fetchData();
  };

  const deleteItem = async (id: string) => {
    await fetch(endpoint, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchData();
  };

  return { data, loading, addItem, updateItem, deleteItem };
}

function EditableTable<T extends { id: string }>({
  data,
  columns,
  lang,
  onDelete,
  onUpdate,
  renderEditForm,
}: {
  data: T[];
  columns: { key: keyof T; label: string; labelEn: string; render?: (row: T) => React.ReactNode }[];
  lang: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<T>) => void;
  renderEditForm: (row: T, onSave: (updates: Partial<T>) => void, onCancel: () => void) => React.ReactNode;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                {lang === "zh" ? col.label : col.labelEn}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
              {lang === "zh" ? "操作" : "Actions"}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50">
              {editingId === row.id ? (
                <td colSpan={columns.length + 1} className="px-6 py-4">
                  {renderEditForm(row, (updates) => { onUpdate(row.id, updates); setEditingId(null); }, () => setEditingId(null))}
                </td>
              ) : (
                <>
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-6 py-4 text-sm text-slate-800">
                      {col.render ? col.render(row) : String(row[col.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditingId(row.id)} className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(row.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ShipMaintView({ lang }: { lang: string }) {
  const { data, loading, addItem, updateItem, deleteItem } = useApiData<ShipMaintRecord>("/api/ship-maint");
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ShipMaintRecord>>({});

  if (loading) return <div className="p-8 text-center text-slate-500">{lang === "zh" ? "加载中..." : "Loading..."}</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">{lang === "zh" ? "船舶维保" : "Ship Maintenance"}</h3>
          <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-1">
            <Plus className="w-4 h-4" /> {lang === "zh" ? "新增" : "Add"}
          </button>
        </div>
        {showAdd && (
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 grid grid-cols-2 md:grid-cols-3 gap-3">
            <input placeholder={lang === "zh" ? "船舶" : "Ship"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, shipName: e.target.value })} />
            <input placeholder={lang === "zh" ? "类型" : "Type"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, maintType: e.target.value })} />
            <input placeholder={lang === "zh" ? "描述" : "Description"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
            <input type="date" className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, startDate: e.target.value })} />
            <input type="date" className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, endDate: e.target.value })} />
            <input type="number" placeholder={lang === "zh" ? "费用" : "Cost"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, cost: Number(e.target.value) })} />
            <div className="flex gap-2 col-span-full">
              <button onClick={() => { addItem(newItem as Omit<ShipMaintRecord, "id">); setShowAdd(false); setNewItem({}); }} className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 flex items-center gap-1">
                <Check className="w-4 h-4" /> {lang === "zh" ? "保存" : "Save"}
              </button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-slate-300 text-slate-700 text-sm rounded hover:bg-slate-400 flex items-center gap-1">
                <X className="w-4 h-4" /> {lang === "zh" ? "取消" : "Cancel"}
              </button>
            </div>
          </div>
        )}
        <EditableTable
          data={data}
          lang={lang}
          onDelete={deleteItem}
          onUpdate={updateItem}
          columns={[
            { key: "id", label: "编号", labelEn: "ID" },
            { key: "shipName", label: "船舶", labelEn: "Ship" },
            { key: "maintType", label: "类型", labelEn: "Type" },
            { key: "description", label: "描述", labelEn: "Description" },
            { key: "startDate", label: "开始", labelEn: "Start" },
            { key: "endDate", label: "结束", labelEn: "End" },
            { key: "cost", label: "费用", labelEn: "Cost", render: (row) => <>¥{Number(row.cost).toLocaleString()}</> },
            { key: "status", label: "状态", labelEn: "Status", render: (row) => (
              <span className={`px-2 py-0.5 text-xs rounded ${row.status === "已完成" ? "bg-green-100 text-green-600" : row.status === "进行中" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"}`}>
                {lang === "zh" ? row.status : row.statusEn}
              </span>
            )},
          ]}
          renderEditForm={(row, onSave, onCancel) => (
            <div className="flex flex-wrap gap-2">
              <input defaultValue={row.shipName} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ shipName: e.target.value })} />
              <input defaultValue={row.maintType} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ maintType: e.target.value })} />
              <input defaultValue={row.description} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ description: e.target.value })} />
              <input type="date" defaultValue={row.startDate} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ startDate: e.target.value })} />
              <input type="date" defaultValue={row.endDate} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ endDate: e.target.value })} />
              <input type="number" defaultValue={row.cost} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ cost: Number(e.target.value) })} />
              <select defaultValue={row.status} className="px-2 py-1 border rounded text-sm" onChange={(e) => onSave({ status: e.target.value })}>
                <option value="待开始">{lang === "zh" ? "待开始" : "Pending"}</option>
                <option value="进行中">{lang === "zh" ? "进行中" : "In Progress"}</option>
                <option value="已完成">{lang === "zh" ? "已完成" : "Completed"}</option>
              </select>
              <button onClick={onCancel} className="px-3 py-1 bg-slate-300 rounded text-sm">{lang === "zh" ? "完成" : "Done"}</button>
            </div>
          )}
        />
      </div>
    </motion.div>
  );
}

function MaintenanceView({ lang }: { lang: string }) {
  const maintData = [
    {
      name: "MS Ocean Star",
      plan: "年度检验",
      planEn: "Annual Survey",
      status: "进行中",
      statusEn: "In Progress",
      progress: 65,
    },
    {
      name: "MS Pacific Wave",
      plan: "中间检验",
      planEn: "Intermediate Survey",
      status: "待开始",
      statusEn: "Pending",
      progress: 0,
    },
    {
      name: "MS Atlantic Eagle",
      plan: "坞修",
      planEn: "Dock Repair",
      status: "已完成",
      statusEn: "Completed",
      progress: 100,
    },
    {
      name: "MS Arctic Wind",
      plan: "特别检验",
      planEn: "Special Survey",
      status: "进行中",
      statusEn: "In Progress",
      progress: 30,
    },
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
            <p className="text-sm text-slate-500">
              {lang === "zh" ? stat.label : stat.labelEn}
            </p>
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
                  <p className="text-xs text-slate-500">
                    {lang === "zh" ? item.plan : item.planEn}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 text-xs rounded ${
                    item.status === "已完成"
                      ? "bg-green-100 text-green-600"
                      : item.status === "进行中"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {lang === "zh" ? item.status : item.statusEn}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    item.progress === 100
                      ? "bg-green-500"
                      : item.progress > 0
                      ? "bg-blue-500"
                      : "bg-slate-300"
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

function WorkOrderView({ lang }: { lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "工作卡管理" : "Work Orders"}
          </h3>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
            {lang === "zh" ? "新建工单" : "New Order"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "工单号" : "WO #"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "标题" : "Title"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "船舶" : "Ship"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "负责人" : "Assignee"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "优先级" : "Priority"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "状态" : "Status"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "截止日期" : "Due Date"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockWorkOrders.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {lang === "zh" ? item.title : item.titleEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.ship}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? item.assignee : item.assigneeEn}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        item.priority === "高"
                          ? "bg-red-100 text-red-600"
                          : item.priority === "中"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {lang === "zh" ? item.priority : item.priorityEn}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        item.status === "已完成"
                          ? "bg-green-100 text-green-600"
                          : item.status === "进行中"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {lang === "zh" ? item.status : item.statusEn}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function RepairOrderView({ lang }: { lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "维修工单" : "Repair Orders"}
          </h3>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
            {lang === "zh" ? "新建工单" : "New Order"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "工单号" : "RO #"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "标题" : "Title"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "船舶" : "Ship"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "类型" : "Type"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "费用" : "Cost"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "状态" : "Status"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockRepairOrders.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {lang === "zh" ? item.title : item.titleEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.ship}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? item.type : item.typeEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    ¥{item.cost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        item.status === "已完成"
                          ? "bg-green-100 text-green-600"
                          : item.status === "已批准"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {lang === "zh" ? item.status : item.statusEn}
                    </span>
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

function StockView({ lang }: { lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "库存管理" : "Inventory"}
          </h3>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
            {lang === "zh" ? "入库" : "Stock In"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "物料编号" : "ID"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "物料名称" : "Name"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "类别" : "Category"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "库存量" : "Qty"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "单位" : "Unit"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "安全库存" : "Min Stock"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "存放位置" : "Location"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockStock.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {lang === "zh" ? item.name : item.nameEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? item.category : item.categoryEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? item.unit : item.unitEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.minStock}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? item.location : item.locationEn}
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

function PurchaseApplyView({ lang }: { lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "采购申请" : "Purchase Applications"}
          </h3>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
            {lang === "zh" ? "新建申请" : "New Apply"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "申请编号" : "ID"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "标题" : "Title"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "申请人" : "Applicant"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "金额" : "Amount"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "状态" : "Status"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "申请日期" : "Date"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockPurchaseApply.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {lang === "zh" ? item.title : item.titleEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? item.applicant : item.applicantEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    ¥{item.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        item.status === "已完成"
                          ? "bg-green-100 text-green-600"
                          : item.status === "已批准"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {lang === "zh" ? item.status : item.statusEn}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.applyDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

interface PurchaseApproval {
  id: string;
  title: string;
  titleEn: string;
  applicant: string;
  applicantEn: string;
  amount: number;
  approver: string;
  approverEn: string;
  status: string;
  statusEn: string;
  applyDate: string;
  approveDate?: string;
}

function PurchaseApprovalView({ lang }: { lang: string }) {
  const { data, loading, addItem, updateItem, deleteItem } = useApiData<PurchaseApproval>("/api/purchase-approval");
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState<Partial<PurchaseApproval>>({});

  if (loading) return <div className="p-8 text-center text-slate-500">{lang === "zh" ? "加载中..." : "Loading..."}</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">{lang === "zh" ? "采购审批" : "Purchase Approval"}</h3>
          <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-1">
            <Plus className="w-4 h-4" /> {lang === "zh" ? "新增" : "Add"}
          </button>
        </div>
        {showAdd && (
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 grid grid-cols-2 md:grid-cols-3 gap-3">
            <input placeholder={lang === "zh" ? "标题" : "Title"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} />
            <input placeholder={lang === "zh" ? "申请人" : "Applicant"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, applicant: e.target.value })} />
            <input placeholder={lang === "zh" ? "审批人" : "Approver"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, approver: e.target.value })} />
            <input type="number" placeholder={lang === "zh" ? "金额" : "Amount"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, amount: Number(e.target.value) })} />
            <input type="date" className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, applyDate: e.target.value })} />
            <div className="flex gap-2 col-span-full">
              <button onClick={() => { addItem(newItem as Omit<PurchaseApproval, "id">); setShowAdd(false); setNewItem({}); }} className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 flex items-center gap-1">
                <Check className="w-4 h-4" /> {lang === "zh" ? "保存" : "Save"}
              </button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-slate-300 text-slate-700 text-sm rounded hover:bg-slate-400 flex items-center gap-1">
                <X className="w-4 h-4" /> {lang === "zh" ? "取消" : "Cancel"}
              </button>
            </div>
          </div>
        )}
        <EditableTable
          data={data}
          lang={lang}
          onDelete={deleteItem}
          onUpdate={updateItem}
          columns={[
            { key: "id", label: "编号", labelEn: "ID" },
            { key: "title", label: "标题", labelEn: "Title" },
            { key: "applicant", label: "申请人", labelEn: "Applicant" },
            { key: "amount", label: "金额", labelEn: "Amount", render: (row) => <>¥{Number(row.amount).toLocaleString()}</> },
            { key: "approver", label: "审批人", labelEn: "Approver" },
            { key: "applyDate", label: "申请日期", labelEn: "Date" },
            { key: "status", label: "状态", labelEn: "Status", render: (row) => (
              <span className={`px-2 py-0.5 text-xs rounded ${row.status === "已批准" ? "bg-green-100 text-green-600" : row.status === "已驳回" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"}`}>
                {lang === "zh" ? row.status : row.statusEn}
              </span>
            )},
          ]}
          renderEditForm={(row, onSave, onCancel) => (
            <div className="flex flex-wrap gap-2">
              <input defaultValue={row.title} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ title: e.target.value })} />
              <input defaultValue={row.applicant} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ applicant: e.target.value })} />
              <input defaultValue={row.approver} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ approver: e.target.value })} />
              <input type="number" defaultValue={row.amount} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ amount: Number(e.target.value) })} />
              <input type="date" defaultValue={row.applyDate} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ applyDate: e.target.value })} />
              <select defaultValue={row.status} className="px-2 py-1 border rounded text-sm" onChange={(e) => onSave({ status: e.target.value })}>
                <option value="审批中">{lang === "zh" ? "审批中" : "Approving"}</option>
                <option value="已批准">{lang === "zh" ? "已批准" : "Approved"}</option>
                <option value="已驳回">{lang === "zh" ? "已驳回" : "Rejected"}</option>
              </select>
              <button onClick={onCancel} className="px-3 py-1 bg-slate-300 rounded text-sm">{lang === "zh" ? "完成" : "Done"}</button>
            </div>
          )}
        />
      </div>
    </motion.div>
  );
}

function SupplierView({ lang }: { lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "供应商管理" : "Suppliers"}
          </h3>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
            {lang === "zh" ? "新增供应商" : "Add Supplier"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "编号" : "ID"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "供应商名称" : "Name"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "联系人" : "Contact"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "电话" : "Phone"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "评分" : "Rating"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "合作时长" : "Cooperation"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockSuppliers.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {lang === "zh" ? item.name : item.nameEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? item.contact : item.contactEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">
                      {item.rating}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? item.cooperation : item.cooperationEn}
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

function CrewListView({ lang }: { lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "船员名单" : "Crew List"}
          </h3>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
            {lang === "zh" ? "新增船员" : "Add Crew"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "编号" : "ID"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "姓名" : "Name"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "职位" : "Position"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "船舶" : "Ship"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "国籍" : "Nationality"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "证书到期" : "Cert Expiry"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "状态" : "Status"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCrewList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {lang === "zh" ? item.name : item.nameEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? item.position : item.positionEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.ship}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? item.nationality : item.nationalityEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.certExpiry}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        item.status === "在船"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {lang === "zh" ? item.status : item.statusEn}
                    </span>
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

function CrewCertView({ lang }: { lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "船员证书" : "Crew Certificates"}
          </h3>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
            {lang === "zh" ? "新增证书" : "Add Cert"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "编号" : "ID"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "持证人" : "Holder"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "证书类型" : "Type"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "证书号" : "Cert No."}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "签发日期" : "Issue"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "到期日期" : "Expiry"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "状态" : "Status"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCrewCerts.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {lang === "zh" ? item.holder : item.holderEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {lang === "zh" ? item.certType : item.certTypeEn}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.certNo}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.issueDate}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.expiryDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        item.status === "有效"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {lang === "zh" ? item.status : item.statusEn}
                    </span>
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

interface CrewSalary {
  id: string;
  crewId: string;
  name: string;
  nameEn: string;
  position: string;
  positionEn: string;
  baseSalary: number;
  bonus: number;
  deduction: number;
  totalSalary: number;
  payDate: string;
  month: string;
}

function CrewSalaryView({ lang }: { lang: string }) {
  const { data, loading, addItem, updateItem, deleteItem } = useApiData<CrewSalary>("/api/crew-salary");
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState<Partial<CrewSalary>>({});

  if (loading) return <div className="p-8 text-center text-slate-500">{lang === "zh" ? "加载中..." : "Loading..."}</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">{lang === "zh" ? "薪资管理" : "Salary Management"}</h3>
          <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-1">
            <Plus className="w-4 h-4" /> {lang === "zh" ? "新增" : "Add"}
          </button>
        </div>
        {showAdd && (
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-3">
            <input placeholder={lang === "zh" ? "船员ID" : "Crew ID"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, crewId: e.target.value })} />
            <input placeholder={lang === "zh" ? "姓名" : "Name"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
            <input placeholder={lang === "zh" ? "职位" : "Position"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, position: e.target.value })} />
            <input type="number" placeholder={lang === "zh" ? "基本工资" : "Base Salary"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, baseSalary: Number(e.target.value) })} />
            <input type="number" placeholder={lang === "zh" ? "奖金" : "Bonus"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, bonus: Number(e.target.value) })} />
            <input type="number" placeholder={lang === "zh" ? "扣款" : "Deduction"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, deduction: Number(e.target.value) })} />
            <input type="date" placeholder={lang === "zh" ? "发薪日" : "Pay Date"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, payDate: e.target.value })} />
            <input placeholder={lang === "zh" ? "月份" : "Month"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, month: e.target.value })} />
            <div className="flex gap-2 col-span-full">
              <button onClick={() => { addItem(newItem as Omit<CrewSalary, "id">); setShowAdd(false); setNewItem({}); }} className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 flex items-center gap-1">
                <Check className="w-4 h-4" /> {lang === "zh" ? "保存" : "Save"}
              </button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-slate-300 text-slate-700 text-sm rounded hover:bg-slate-400 flex items-center gap-1">
                <X className="w-4 h-4" /> {lang === "zh" ? "取消" : "Cancel"}
              </button>
            </div>
          </div>
        )}
        <EditableTable
          data={data}
          lang={lang}
          onDelete={deleteItem}
          onUpdate={updateItem}
          columns={[
            { key: "id", label: "编号", labelEn: "ID" },
            { key: "crewId", label: "船员ID", labelEn: "Crew ID" },
            { key: "name", label: "姓名", labelEn: "Name" },
            { key: "position", label: "职位", labelEn: "Position" },
            { key: "baseSalary", label: "基本工资", labelEn: "Base", render: (row) => <>¥{Number(row.baseSalary).toLocaleString()}</> },
            { key: "bonus", label: "奖金", labelEn: "Bonus", render: (row) => <>¥{Number(row.bonus).toLocaleString()}</> },
            { key: "deduction", label: "扣款", labelEn: "Deduction", render: (row) => <>¥{Number(row.deduction).toLocaleString()}</> },
            { key: "totalSalary", label: "实发工资", labelEn: "Total", render: (row) => <span className="font-semibold text-green-600">¥{Number(row.totalSalary).toLocaleString()}</span> },
            { key: "month", label: "月份", labelEn: "Month" },
          ]}
          renderEditForm={(row, onSave, onCancel) => (
            <div className="flex flex-wrap gap-2">
              <input defaultValue={row.crewId} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ crewId: e.target.value })} />
              <input defaultValue={row.name} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ name: e.target.value })} />
              <input defaultValue={row.position} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ position: e.target.value })} />
              <input type="number" defaultValue={row.baseSalary} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ baseSalary: Number(e.target.value) })} />
              <input type="number" defaultValue={row.bonus} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ bonus: Number(e.target.value) })} />
              <input type="number" defaultValue={row.deduction} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ deduction: Number(e.target.value) })} />
              <input type="date" defaultValue={row.payDate} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ payDate: e.target.value })} />
              <input defaultValue={row.month} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ month: e.target.value })} />
              <button onClick={onCancel} className="px-3 py-1 bg-slate-300 rounded text-sm">{lang === "zh" ? "完成" : "Done"}</button>
            </div>
          )}
        />
      </div>
    </motion.div>
  );
}

interface MaintPlan {
  id: string;
  shipName: string;
  equipment: string;
  equipmentEn: string;
  maintItem: string;
  maintItemEn: string;
  cwbtCode: string;
  period: string;
  periodEn: string;
  lastDate: string;
  nextDate: string;
  status: string;
  statusEn: string;
  progress: number;
  assignee: string;
  assigneeEn: string;
}

const mockMaintPlans: MaintPlan[] = [
  {
    id: "MP001",
    shipName: "MS Ocean Star",
    equipment: "主发动机",
    equipmentEn: "Main Engine",
    maintItem: "主机例行保养",
    maintItemEn: "Engine Routine Maint.",
    cwbtCode: "CWBT-ME-001",
    period: "月度",
    periodEn: "Monthly",
    lastDate: "2024-04-15",
    nextDate: "2024-05-15",
    status: "进行中",
    statusEn: "In Progress",
    progress: 65,
    assignee: "张工程师",
    assigneeEn: "Eng. Zhang",
  },
  {
    id: "MP002",
    shipName: "MS Pacific Wave",
    equipment: "辅助发电机",
    equipmentEn: "Generator",
    maintItem: "发电机绝缘检测",
    maintItemEn: "Generator Insulation Test",
    cwbtCode: "CWBT-EG-003",
    period: "季度",
    periodEn: "Quarterly",
    lastDate: "2024-02-20",
    nextDate: "2024-05-20",
    status: "待开始",
    statusEn: "Pending",
    progress: 0,
    assignee: "李电工",
    assigneeEn: "Electrician Li",
  },
  {
    id: "MP003",
    shipName: "MS Atlantic Eagle",
    equipment: "雷达系统",
    equipmentEn: "Radar System",
    maintItem: "雷达天线检修",
    maintItemEn: "Radar Antenna Maint.",
    cwbtCode: "CWBT-NV-005",
    period: "半年度",
    periodEn: "Semi-Annual",
    lastDate: "2023-11-10",
    nextDate: "2024-05-10",
    status: "已逾期",
    statusEn: "Overdue",
    progress: 0,
    assignee: "王技术员",
    assigneeEn: "Tech Wang",
  },
  {
    id: "MP004",
    shipName: "MS Arctic Wind",
    equipment: "锚机",
    equipmentEn: "Windlass",
    maintItem: "锚机液压系统保养",
    maintItemEn: "Windlass Hydraulic Maint.",
    cwbtCode: "CWBT-DE-012",
    period: "年度",
    periodEn: "Annual",
    lastDate: "2023-05-01",
    nextDate: "2024-05-01",
    status: "已完成",
    statusEn: "Completed",
    progress: 100,
    assignee: "赵技工",
    assigneeEn: "Tech Zhao",
  },
  {
    id: "MP005",
    shipName: "MS Ocean Star",
    equipment: "消防泵",
    equipmentEn: "Fire Pump",
    maintItem: "消防泵功能测试",
    maintItemEn: "Fire Pump Function Test",
    cwbtCode: "CWBT-SF-008",
    period: "月度",
    periodEn: "Monthly",
    lastDate: "2024-04-20",
    nextDate: "2024-05-20",
    status: "待开始",
    statusEn: "Pending",
    progress: 0,
    assignee: "孙安全员",
    assigneeEn: "Safety Sun",
  },
];

const mockMaintAlerts = [
  { id: 1, ship: "MS Atlantic Eagle", item: "雷达天线检修", itemEn: "Radar Antenna Maint.", days: -2, type: "逾期", typeEn: "Overdue", level: "high" },
  { id: 2, ship: "MS Pacific Wave", item: "发电机绝缘检测", itemEn: "Generator Insulation Test", days: 8, type: "即将到期", typeEn: "Due Soon", level: "medium" },
  { id: 3, ship: "MS Ocean Star", item: "消防泵功能测试", itemEn: "Fire Pump Function Test", days: 12, type: "即将到期", typeEn: "Due Soon", level: "medium" },
  { id: 4, ship: "MS Arctic Wind", item: "舵机系统保养", itemEn: "Steering Gear Maint.", days: 25, type: "预警", typeEn: "Warning", level: "low" },
];

const mockMaintCalendar = [
  { week: "第1周", weekEn: "Week 1", items: 3, completed: 2 },
  { week: "第2周", weekEn: "Week 2", items: 4, completed: 1 },
  { week: "第3周", weekEn: "Week 3", items: 2, completed: 0 },
  { week: "第4周", weekEn: "Week 4", items: 3, completed: 0 },
];

function MaintBoardView({ lang }: { lang: string }) {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredPlans = filterStatus === "all"
    ? mockMaintPlans
    : mockMaintPlans.filter(p => p.status === filterStatus);

  const stats = [
    { label: "本月计划", labelEn: "Monthly Plan", value: mockMaintPlans.length, color: "bg-blue-500" },
    { label: "已完成", labelEn: "Completed", value: mockMaintPlans.filter(p => p.status === "已完成").length, color: "bg-green-500" },
    { label: "进行中", labelEn: "In Progress", value: mockMaintPlans.filter(p => p.status === "进行中").length, color: "bg-orange-500" },
    { label: "已逾期", labelEn: "Overdue", value: mockMaintPlans.filter(p => p.status === "已逾期").length, color: "bg-red-500" },
  ];

  const statusFilters = [
    { key: "all", label: "全部", labelEn: "All" },
    { key: "进行中", label: "进行中", labelEn: "In Progress" },
    { key: "待开始", label: "待开始", labelEn: "Pending" },
    { key: "已完成", label: "已完成", labelEn: "Completed" },
    { key: "已逾期", label: "已逾期", labelEn: "Overdue" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
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
                <Wrench className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Alert Banner */}
      {mockMaintAlerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" />
            {lang === "zh" ? "维保预警" : "Maintenance Alerts"}
          </h3>
          <div className="space-y-2">
            {mockMaintAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  alert.level === "high"
                    ? "bg-red-50 border border-red-200"
                    : alert.level === "medium"
                    ? "bg-orange-50 border border-orange-200"
                    : "bg-yellow-50 border border-yellow-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-5 h-5 ${
                    alert.level === "high" ? "text-red-500" : alert.level === "medium" ? "text-orange-500" : "text-yellow-500"
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {alert.ship} - {lang === "zh" ? alert.item : alert.itemEn}
                    </p>
                    <p className="text-xs text-slate-500">
                      {alert.days < 0
                        ? `${lang === "zh" ? "已逾期" : "Overdue"} ${Math.abs(alert.days)} ${lang === "zh" ? "天" : "days"}`
                        : `${lang === "zh" ? "还剩" : "Due in"} ${alert.days} ${lang === "zh" ? "天" : "days"}`}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 text-xs rounded ${
                  alert.level === "high"
                    ? "bg-red-100 text-red-600"
                    : alert.level === "medium"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}>
                  {lang === "zh" ? alert.type : alert.typeEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Maintenance Plans Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "维保计划列表" : "Maintenance Plans"}
          </h3>
          <div className="flex gap-2">
            {statusFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterStatus(f.key)}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  filterStatus === f.key
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {lang === "zh" ? f.label : f.labelEn}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "CWBT编号" : "CWBT Code"}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "船舶" : "Ship"}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "设备" : "Equipment"}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "维保项目" : "Maint. Item"}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "周期" : "Period"}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "下次维保" : "Next Date"}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "进度" : "Progress"}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "负责人" : "Assignee"}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "状态" : "Status"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPlans.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-mono text-slate-600">{item.cwbtCode}</td>
                  <td className="px-4 py-3 text-sm text-slate-800 font-medium">{item.shipName}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{lang === "zh" ? item.equipment : item.equipmentEn}</td>
                  <td className="px-4 py-3 text-sm text-slate-800">{lang === "zh" ? item.maintItem : item.maintItemEn}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{lang === "zh" ? item.period : item.periodEn}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{item.nextDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            item.progress === 100 ? "bg-green-500" : item.progress > 0 ? "bg-blue-500" : "bg-slate-300"
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{item.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{lang === "zh" ? item.assignee : item.assigneeEn}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      item.status === "已完成" ? "bg-green-100 text-green-600" :
                      item.status === "进行中" ? "bg-blue-100 text-blue-600" :
                      item.status === "已逾期" ? "bg-red-100 text-red-600" :
                      "bg-orange-100 text-orange-600"
                    }`}>
                      {lang === "zh" ? item.status : item.statusEn}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "本月维保日历" : "Monthly Maintenance Calendar"}
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockMaintCalendar.map((week) => (
              <div key={week.week} className="border rounded-lg p-4">
                <p className="text-sm font-medium text-slate-800 mb-2">{lang === "zh" ? week.week : week.weekEn}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">{lang === "zh" ? "计划" : "Planned"}</span>
                    <span className="font-medium text-slate-800">{week.items}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">{lang === "zh" ? "完成" : "Completed"}</span>
                    <span className="font-medium text-green-600">{week.completed}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${week.items > 0 ? (week.completed / week.items) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CostAnalysisView({ lang }: { lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">
            {lang === "zh" ? "费用分析" : "Cost Analysis"}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "月份" : "Month"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "维保费用" : "Maintenance"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "维修费用" : "Repair"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "采购费用" : "Purchase"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "燃油费用" : "Fuel"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {lang === "zh" ? "合计" : "Total"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCostData.map((item) => (
                <tr key={item.month} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {item.month}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    ¥{item.maintCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    ¥{item.repairCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    ¥{item.purchaseCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    ¥{item.fuelCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    ¥
                    {(
                      item.maintCost +
                      item.repairCost +
                      item.purchaseCost +
                      item.fuelCost
                    ).toLocaleString()}
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

interface Document {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  version: string;
  author: string;
  authorEn: string;
  createDate: string;
  updateDate: string;
  status: string;
  statusEn: string;
}

function DocumentsView({ lang }: { lang: string }) {
  const { data, loading, addItem, updateItem, deleteItem } = useApiData<Document>("/api/documents");
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState<Partial<Document>>({});

  if (loading) return <div className="p-8 text-center text-slate-500">{lang === "zh" ? "加载中..." : "Loading..."}</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">{lang === "zh" ? "体系文件" : "Documents"}</h3>
          <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-1">
            <Plus className="w-4 h-4" /> {lang === "zh" ? "新增" : "Add"}
          </button>
        </div>
        {showAdd && (
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 grid grid-cols-2 md:grid-cols-3 gap-3">
            <input placeholder={lang === "zh" ? "标题" : "Title"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} />
            <input placeholder={lang === "zh" ? "类别" : "Category"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} />
            <input placeholder={lang === "zh" ? "版本" : "Version"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, version: e.target.value })} />
            <input placeholder={lang === "zh" ? "作者" : "Author"} className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, author: e.target.value })} />
            <input type="date" className="px-3 py-2 border rounded text-sm" onChange={(e) => setNewItem({ ...newItem, createDate: e.target.value })} />
            <div className="flex gap-2 col-span-full">
              <button onClick={() => { addItem(newItem as Omit<Document, "id">); setShowAdd(false); setNewItem({}); }} className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 flex items-center gap-1">
                <Check className="w-4 h-4" /> {lang === "zh" ? "保存" : "Save"}
              </button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-slate-300 text-slate-700 text-sm rounded hover:bg-slate-400 flex items-center gap-1">
                <X className="w-4 h-4" /> {lang === "zh" ? "取消" : "Cancel"}
              </button>
            </div>
          </div>
        )}
        <EditableTable
          data={data}
          lang={lang}
          onDelete={deleteItem}
          onUpdate={updateItem}
          columns={[
            { key: "id", label: "编号", labelEn: "ID" },
            { key: "title", label: "标题", labelEn: "Title" },
            { key: "category", label: "类别", labelEn: "Category" },
            { key: "version", label: "版本", labelEn: "Version" },
            { key: "author", label: "作者", labelEn: "Author" },
            { key: "createDate", label: "创建日期", labelEn: "Create Date" },
            { key: "updateDate", label: "更新日期", labelEn: "Update Date" },
            { key: "status", label: "状态", labelEn: "Status", render: (row) => (
              <span className={`px-2 py-0.5 text-xs rounded ${row.status === "已发布" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>
                {lang === "zh" ? row.status : row.statusEn}
              </span>
            )},
          ]}
          renderEditForm={(row, onSave, onCancel) => (
            <div className="flex flex-wrap gap-2">
              <input defaultValue={row.title} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ title: e.target.value })} />
              <input defaultValue={row.category} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ category: e.target.value })} />
              <input defaultValue={row.version} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ version: e.target.value })} />
              <input defaultValue={row.author} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ author: e.target.value })} />
              <input type="date" defaultValue={row.updateDate} className="px-2 py-1 border rounded text-sm" onBlur={(e) => onSave({ updateDate: e.target.value })} />
              <select defaultValue={row.status} className="px-2 py-1 border rounded text-sm" onChange={(e) => onSave({ status: e.target.value })}>
                <option value="审核中">{lang === "zh" ? "审核中" : "Reviewing"}</option>
                <option value="已发布">{lang === "zh" ? "已发布" : "Published"}</option>
                <option value="已作废">{lang === "zh" ? "已作废" : "Obsolete"}</option>
              </select>
              <button onClick={onCancel} className="px-3 py-1 bg-slate-300 rounded text-sm">{lang === "zh" ? "完成" : "Done"}</button>
            </div>
          )}
        />
      </div>
    </motion.div>
  );
}

interface SystemConfig {
  id: string;
  key: string;
  value: string;
  description: string;
  descriptionEn: string;
  updateTime: string;
}

function SystemView({ lang }: { lang: string }) {
  const { data, loading, updateItem } = useApiData<SystemConfig>("/api/system-config");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  if (loading) return <div className="p-8 text-center text-slate-500">{lang === "zh" ? "加载中..." : "Loading..."}</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">{lang === "zh" ? "系统配置" : "System Config"}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "配置项" : "Key"}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "描述" : "Description"}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "当前值" : "Value"}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "更新时间" : "Updated"}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">{lang === "zh" ? "操作" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">{item.key}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{lang === "zh" ? item.description : item.descriptionEn}</td>
                  <td className="px-6 py-4 text-sm text-slate-800">
                    {editingId === item.id ? (
                      <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-2 py-1 border rounded text-sm w-40" autoFocus />
                    ) : (
                      <span className="px-2 py-1 bg-slate-100 rounded text-sm">{item.value}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.updateTime}</td>
                  <td className="px-6 py-4">
                    {editingId === item.id ? (
                      <div className="flex gap-2">
                        <button onClick={() => { updateItem(item.id, { value: editValue }); setEditingId(null); }} className="p-1 text-green-500 hover:bg-green-50 rounded">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-1 text-slate-500 hover:bg-slate-100 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => { setEditingId(item.id); setEditValue(item.value); }} className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}
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
