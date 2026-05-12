import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "shipbiz.json");

export interface ShipMaintRecord {
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

export interface PurchaseApproval {
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

export interface CrewSalary {
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

export interface Document {
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

export interface SystemConfig {
  id: string;
  key: string;
  value: string;
  description: string;
  descriptionEn: string;
  updateTime: string;
}

export interface DB {
  shipMaint: ShipMaintRecord[];
  purchaseApproval: PurchaseApproval[];
  crewSalary: CrewSalary[];
  documents: Document[];
  systemConfig: SystemConfig[];
}

const defaultDB: DB = {
  shipMaint: [
    {
      id: "SM001",
      shipName: "MS Ocean Star",
      shipNameEn: "MS Ocean Star",
      maintType: "年度检验",
      maintTypeEn: "Annual Survey",
      description: "主机系统全面检查与维护",
      descriptionEn: "Main engine system inspection",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      cost: 125000,
      status: "已完成",
      statusEn: "Completed",
    },
    {
      id: "SM002",
      shipName: "MS Pacific Wave",
      shipNameEn: "MS Pacific Wave",
      maintType: "中间检验",
      maintTypeEn: "Intermediate Survey",
      description: "船体结构无损检测",
      descriptionEn: "Hull structure NDT",
      startDate: "2024-05-10",
      endDate: "2024-05-25",
      cost: 86000,
      status: "进行中",
      statusEn: "In Progress",
    },
    {
      id: "SM003",
      shipName: "MS Atlantic Eagle",
      shipNameEn: "MS Atlantic Eagle",
      maintType: "坞修",
      maintTypeEn: "Dock Repair",
      description: "螺旋桨更换与舵系检修",
      descriptionEn: "Propeller replacement",
      startDate: "2024-06-01",
      endDate: "2024-06-20",
      cost: 320000,
      status: "待开始",
      statusEn: "Pending",
    },
  ],
  purchaseApproval: [
    {
      id: "PA001",
      title: "Q2主机备件采购",
      titleEn: "Q2 Engine Spares",
      applicant: "张工程师",
      applicantEn: "Eng. Zhang",
      amount: 125000,
      approver: "李经理",
      approverEn: "Manager Li",
      status: "审批中",
      statusEn: "Approving",
      applyDate: "2024-05-05",
    },
    {
      id: "PA002",
      title: "导航设备更新",
      titleEn: "Nav Equipment Update",
      applicant: "李船长",
      applicantEn: "Capt. Li",
      amount: 280000,
      approver: "王总监",
      approverEn: "Director Wang",
      status: "已批准",
      statusEn: "Approved",
      applyDate: "2024-04-28",
      approveDate: "2024-04-30",
    },
    {
      id: "PA003",
      title: "安全设备补充",
      titleEn: "Safety Equipment",
      applicant: "王安全员",
      applicantEn: "Safety Wang",
      amount: 45000,
      approver: "李经理",
      approverEn: "Manager Li",
      status: "已驳回",
      statusEn: "Rejected",
      applyDate: "2024-04-15",
      approveDate: "2024-04-16",
    },
  ],
  crewSalary: [
    {
      id: "CS001",
      crewId: "CR001",
      name: "李明",
      nameEn: "Li Ming",
      position: "船长",
      positionEn: "Captain",
      baseSalary: 35000,
      bonus: 5000,
      deduction: 2000,
      totalSalary: 38000,
      payDate: "2024-05-15",
      month: "2024-05",
    },
    {
      id: "CS002",
      crewId: "CR002",
      name: "王强",
      nameEn: "Wang Qiang",
      position: "大副",
      positionEn: "Chief Officer",
      baseSalary: 28000,
      bonus: 3000,
      deduction: 1500,
      totalSalary: 29500,
      payDate: "2024-05-15",
      month: "2024-05",
    },
    {
      id: "CS003",
      crewId: "CR003",
      name: "Tom Johnson",
      nameEn: "Tom Johnson",
      position: "轮机长",
      positionEn: "Chief Engineer",
      baseSalary: 32000,
      bonus: 4000,
      deduction: 1800,
      totalSalary: 34200,
      payDate: "2024-05-15",
      month: "2024-05",
    },
  ],
  documents: [
    {
      id: "DOC001",
      title: "船舶安全管理体系手册",
      titleEn: "Ship Safety Management System",
      category: "安全管理",
      categoryEn: "Safety",
      version: "V3.2",
      author: "王安全员",
      authorEn: "Safety Wang",
      createDate: "2023-01-15",
      updateDate: "2024-03-20",
      status: "已发布",
      statusEn: "Published",
    },
    {
      id: "DOC002",
      title: "船舶维护保养程序",
      titleEn: "Ship Maintenance Procedure",
      category: "维护保养",
      categoryEn: "Maintenance",
      version: "V2.1",
      author: "张工程师",
      authorEn: "Eng. Zhang",
      createDate: "2023-06-10",
      updateDate: "2024-01-15",
      status: "已发布",
      statusEn: "Published",
    },
    {
      id: "DOC003",
      title: "船员培训计划",
      titleEn: "Crew Training Plan",
      category: "培训管理",
      categoryEn: "Training",
      version: "V1.5",
      author: "李船长",
      authorEn: "Capt. Li",
      createDate: "2024-02-01",
      updateDate: "2024-04-10",
      status: "审核中",
      statusEn: "Reviewing",
    },
  ],
  systemConfig: [
    {
      id: "CFG001",
      key: "company_name",
      value: "上海航运有限公司",
      description: "公司名称",
      descriptionEn: "Company Name",
      updateTime: "2024-01-01",
    },
    {
      id: "CFG002",
      key: "currency",
      value: "CNY",
      description: "默认货币",
      descriptionEn: "Default Currency",
      updateTime: "2024-01-01",
    },
    {
      id: "CFG003",
      key: "language",
      value: "zh-CN",
      description: "系统语言",
      descriptionEn: "System Language",
      updateTime: "2024-01-01",
    },
    {
      id: "CFG004",
      key: "maint_reminder_days",
      value: "30",
      description: "维保提前提醒天数",
      descriptionEn: "Maintenance reminder days",
      updateTime: "2024-03-15",
    },
  ],
};

function ensureDB(): DB {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDB, null, 2), "utf-8");
    return { ...defaultDB };
  }
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw) as DB;
}

function saveDB(db: DB): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export function getDB(): DB {
  return ensureDB();
}

export function updateDB(updates: Partial<DB>): DB {
  const db = ensureDB();
  const newDB = { ...db, ...updates };
  saveDB(newDB);
  return newDB;
}

// ShipMaint CRUD
export function getShipMaint(): ShipMaintRecord[] {
  return ensureDB().shipMaint;
}

export function addShipMaint(record: Omit<ShipMaintRecord, "id">): ShipMaintRecord {
  const db = ensureDB();
  const idx = db.shipMaint.length + 1;
  const id = "SM" + String(idx).padStart(3, "0");
  const newRecord = { ...record, id };
  db.shipMaint.push(newRecord);
  saveDB(db);
  return newRecord;
}

export function updateShipMaint(id: string, updates: Partial<ShipMaintRecord>): ShipMaintRecord | null {
  const db = ensureDB();
  const idx = db.shipMaint.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  db.shipMaint[idx] = { ...db.shipMaint[idx], ...updates };
  saveDB(db);
  return db.shipMaint[idx];
}

export function deleteShipMaint(id: string): boolean {
  const db = ensureDB();
  const idx = db.shipMaint.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  db.shipMaint.splice(idx, 1);
  saveDB(db);
  return true;
}

// PurchaseApproval CRUD
export function getPurchaseApproval(): PurchaseApproval[] {
  return ensureDB().purchaseApproval;
}

export function addPurchaseApproval(record: Omit<PurchaseApproval, "id">): PurchaseApproval {
  const db = ensureDB();
  const idx = db.purchaseApproval.length + 1;
  const id = "PA" + String(idx).padStart(3, "0");
  const newRecord = { ...record, id };
  db.purchaseApproval.push(newRecord);
  saveDB(db);
  return newRecord;
}

export function updatePurchaseApproval(id: string, updates: Partial<PurchaseApproval>): PurchaseApproval | null {
  const db = ensureDB();
  const idx = db.purchaseApproval.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  db.purchaseApproval[idx] = { ...db.purchaseApproval[idx], ...updates };
  saveDB(db);
  return db.purchaseApproval[idx];
}

export function deletePurchaseApproval(id: string): boolean {
  const db = ensureDB();
  const idx = db.purchaseApproval.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  db.purchaseApproval.splice(idx, 1);
  saveDB(db);
  return true;
}

// CrewSalary CRUD
export function getCrewSalary(): CrewSalary[] {
  return ensureDB().crewSalary;
}

export function addCrewSalary(record: Omit<CrewSalary, "id">): CrewSalary {
  const db = ensureDB();
  const idx = db.crewSalary.length + 1;
  const id = "CS" + String(idx).padStart(3, "0");
  const totalSalary = record.baseSalary + record.bonus - record.deduction;
  const newRecord = { ...record, id, totalSalary };
  db.crewSalary.push(newRecord);
  saveDB(db);
  return newRecord;
}

export function updateCrewSalary(id: string, updates: Partial<CrewSalary>): CrewSalary | null {
  const db = ensureDB();
  const idx = db.crewSalary.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  const record = { ...db.crewSalary[idx], ...updates };
  record.totalSalary = record.baseSalary + record.bonus - record.deduction;
  db.crewSalary[idx] = record;
  saveDB(db);
  return record;
}

export function deleteCrewSalary(id: string): boolean {
  const db = ensureDB();
  const idx = db.crewSalary.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  db.crewSalary.splice(idx, 1);
  saveDB(db);
  return true;
}

// Document CRUD
export function getDocuments(): Document[] {
  return ensureDB().documents;
}

export function addDocument(record: Omit<Document, "id">): Document {
  const db = ensureDB();
  const idx = db.documents.length + 1;
  const id = "DOC" + String(idx).padStart(3, "0");
  const newRecord = { ...record, id };
  db.documents.push(newRecord);
  saveDB(db);
  return newRecord;
}

export function updateDocument(id: string, updates: Partial<Document>): Document | null {
  const db = ensureDB();
  const idx = db.documents.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  db.documents[idx] = { ...db.documents[idx], ...updates };
  saveDB(db);
  return db.documents[idx];
}

export function deleteDocument(id: string): boolean {
  const db = ensureDB();
  const idx = db.documents.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  db.documents.splice(idx, 1);
  saveDB(db);
  return true;
}

// SystemConfig CRUD
export function getSystemConfig(): SystemConfig[] {
  return ensureDB().systemConfig;
}

export function updateSystemConfig(id: string, updates: Partial<SystemConfig>): SystemConfig | null {
  const db = ensureDB();
  const idx = db.systemConfig.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  db.systemConfig[idx] = { ...db.systemConfig[idx], ...updates, updateTime: new Date().toISOString().split("T")[0] };
  saveDB(db);
  return db.systemConfig[idx];
}
