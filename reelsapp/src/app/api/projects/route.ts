import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { inngest } from "@/lib/inngest";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { projects: { orderBy: { createdAt: "desc" } } },
  });

  return NextResponse.json(user?.projects ?? []);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, prompt, sourceUrl } = body;

  let user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    user = await prisma.user.create({
      data: { clerkId: userId, email: `${userId}@clerk.temp` },
    });
  }

  const project = await prisma.project.create({
    data: { userId: user.id, name, prompt, sourceUrl, status: "PENDING" },
  });

  await inngest.send({ name: "project/process", data: { projectId: project.id } });

  return NextResponse.json(project, { status: 201 });
}
