
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET /api/customers/clerk/[id]
export async function GET(req: Request, { params }: { params: { id: string } }) {
	const clerkId = params.id;
	if (!clerkId) {
		return NextResponse.json({ error: "Invalid clerkId" }, { status: 400 });
	}
	const customer = await prisma.customer.findUnique({ where: { clerkId } });
	if (!customer) {
		return NextResponse.json({ error: "Customer not found" }, { status: 404 });
	}
	return NextResponse.json(customer);
}

// PUT /api/customers/clerk/[id]
export async function PUT(req: Request, { params }: { params: { id: string } }) {
	const clerkId = params.id;
	if (!clerkId) {
		return NextResponse.json({ error: "Invalid clerkId" }, { status: 400 });
	}
	const data = await req.json();
	try {
		const updated = await prisma.customer.update({
			where: { clerkId },
			data,
		});
		return NextResponse.json(updated);
	} catch (error) {
		return NextResponse.json({ error: "Customer not found or update failed" }, { status: 404 });
	}
}

// DELETE /api/customers/clerk/[id]
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	const clerkId = params.id;
	if (!clerkId) {
		return NextResponse.json({ error: "Invalid clerkId" }, { status: 400 });
	}
	try {
		await prisma.customer.delete({ where: { clerkId } });
		return NextResponse.json({ message: "Customer deleted" });
	} catch (error) {
		return NextResponse.json({ error: "Customer not found or delete failed" }, { status: 404 });
	}
}
