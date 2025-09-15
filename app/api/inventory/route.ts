import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    const inventory = await prisma.inventory.findMany();
    return NextResponse.json(inventory);
}

export async function POST(req: Request) {
    const data = await req.json();
    const inventory = await prisma.inventory.create({ data });
    return NextResponse.json(inventory);
}
