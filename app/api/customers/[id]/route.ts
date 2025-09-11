import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET /api/customers/[id]
export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const numId = Number(id);
	if (isNaN(numId)) {
		return NextResponse.json({ error: "Invalid customer id" }, { status: 400 });
	}
	const customer = await prisma.customer.findUnique({ where: { id: numId } });
	if (!customer) {
		return NextResponse.json({ error: "Customer not found" }, { status: 404 });
	}
	return NextResponse.json(customer);
}

// PUT /api/customers/[id]
export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const numId = Number(id);
	if (isNaN(numId)) {
		return NextResponse.json({ error: "Invalid customer id" }, { status: 400 });
	}
	const data = await req.json();
	try {
		const updated = await prisma.customer.update({
			where: { id: numId },
			data,
		});
		return NextResponse.json(updated);
	} catch (error) {
		return NextResponse.json({ error: "Customer not found or update failed" }, { status: 404 });
	}
}

// DELETE /api/customers/[id]
export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const numId = Number(id);
	if (isNaN(numId)) {
		return NextResponse.json({ error: "Invalid customer id" }, { status: 400 });
	}
	try {
		await prisma.customer.delete({ where: { id: numId } });
		return NextResponse.json({ message: "Customer deleted" });
	} catch (error) {
		return NextResponse.json({ error: "Customer not found or delete failed" }, { status: 404 });
	}
}
