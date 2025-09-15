import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const inventory = await prisma.inventory.findUnique({ where: { id: Number(params.id) } });
    if (!inventory) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(inventory);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();
    try {
        const inventory = await prisma.inventory.update({ where: { id: Number(params.id) }, data });
        return NextResponse.json(inventory);
    } catch {
        return NextResponse.json({ error: "Update failed" }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.inventory.delete({ where: { id: Number(params.id) } });
        return NextResponse.json({ message: "Deleted" });
    } catch {
        return NextResponse.json({ error: "Delete failed" }, { status: 400 });
    }
}
