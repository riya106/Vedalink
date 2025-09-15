import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
}

export async function POST(req: Request) {
    const data = await req.json();
    const order = await prisma.order.create({ data });
    return NextResponse.json(order);
}
