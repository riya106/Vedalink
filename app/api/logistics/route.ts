import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    const logistics = await prisma.logistics.findMany();
    return NextResponse.json(logistics);
}

export async function POST(req: Request) {
    const data = await req.json();
    const logistics = await prisma.logistics.create({ data });
    return NextResponse.json(logistics);
}
