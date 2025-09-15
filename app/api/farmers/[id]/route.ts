import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const farmer = await prisma.farmer.findUnique({ where: { id: Number(params.id) } });
    if (!farmer) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(farmer);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();
    try {
        const farmer = await prisma.farmer.update({ where: { id: Number(params.id) }, data });
        return NextResponse.json(farmer);
    } catch {
        return NextResponse.json({ error: "Update failed" }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.farmer.delete({ where: { id: Number(params.id) } });
        return NextResponse.json({ message: "Deleted" });
    } catch {
        return NextResponse.json({ error: "Delete failed" }, { status: 400 });
    }
}
