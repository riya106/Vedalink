import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    const posts = await prisma.customer.findMany();
    return NextResponse.json(posts);
}

export async function POST(req: Request) {
    const data = await req.json();
    const { clerkId, name, email, phone, address } = data;
    const post = await prisma.customer.create({
        data: { clerkId, name, email, phone, address },
    });

    return NextResponse.json(post);
}