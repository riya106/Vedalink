import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const distributor = await prisma.distributor.findUnique({ where: { id: Number(id) } });
    if (!distributor) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(distributor);
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const data = await req.json();
    try {
        const distributor = await prisma.distributor.update({ where: { id: Number(id) }, data });
        return NextResponse.json(distributor);
    } catch {
        return NextResponse.json({ error: "Update failed" }, { status: 400 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    try {
        await prisma.distributor.delete({ where: { id: Number(id) } });
        return NextResponse.json({ message: "Deleted" });
    } catch {
        return NextResponse.json({ error: "Delete failed" }, { status: 400 });
    }
}
