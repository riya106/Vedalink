import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    const farmers = await prisma.farmer.findMany();
    return NextResponse.json(farmers);
}

export async function POST(req: Request) {
    const data = await req.json();
    const farmer = await prisma.farmer.create({ data });
    return NextResponse.json(farmer);
}
