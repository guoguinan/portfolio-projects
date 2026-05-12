import { NextRequest, NextResponse } from "next/server";
import { getPurchaseApproval, addPurchaseApproval, updatePurchaseApproval, deletePurchaseApproval } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getPurchaseApproval());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const record = addPurchaseApproval(body);
  return NextResponse.json(record, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, ...updates } = await req.json();
  const record = updatePurchaseApproval(id, updates);
  if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const ok = deletePurchaseApproval(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
