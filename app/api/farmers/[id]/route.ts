import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const farmer = await prisma.farmer.findUnique({ where: { id: Number(id) } });
    if (!farmer) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(farmer);
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const data = await req.json();
    try {
        const farmer = await prisma.farmer.update({ where: { id: Number(id) }, data });
        return NextResponse.json(farmer);
    } catch {
        return NextResponse.json({ error: "Update failed" }, { status: 400 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    try {
        await prisma.farmer.delete({ where: { id: Number(id) } });
        return NextResponse.json({ message: "Deleted" });
    } catch {
        return NextResponse.json({ error: "Delete failed" }, { status: 400 });
    }
}
