import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    const distributors = await prisma.distributor.findMany();
    return NextResponse.json(distributors);
}

export async function POST(req: Request) {
    const data = await req.json();
    const distributor = await prisma.distributor.create({ data });
    return NextResponse.json(distributor);
}
