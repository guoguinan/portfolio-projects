import { NextRequest, NextResponse } from "next/server";
import { getSystemConfig, updateSystemConfig } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getSystemConfig());
}

export async function PUT(req: NextRequest) {
  const { id, ...updates } = await req.json();
  const record = updateSystemConfig(id, updates);
  if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(record);
}
