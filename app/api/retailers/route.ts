import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    const retailers = await prisma.retailer.findMany();
    return NextResponse.json(retailers);
}

export async function POST(req: Request) {
    const data = await req.json();
    const retailer = await prisma.retailer.create({ data });
    return NextResponse.json(retailer);
}
