import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    const crops = await prisma.crop.findMany();
    return NextResponse.json(crops);
}

export async function POST(req: Request) {
    const data = await req.json();
    const crop = await prisma.crop.create({ data });
    return NextResponse.json(crop);
}
