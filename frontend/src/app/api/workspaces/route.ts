import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import crypto from "crypto";

// GET /api/workspaces — list workspaces the user belongs to
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const memberships = await db.workspaceMember.findMany({
    where: { userId: session.user.id },
    include: {
      workspace: {
        include: {
          members: { include: { user: true } },
          _count: { select: { tasks: true } },
        },
      },
    },
    orderBy: { workspace: { createdAt: "desc" } },
  });

  const workspaces = memberships.map((m: any) => ({
    ...m.workspace,
    role: m.role,
    memberCount: m.workspace.members.length,
    taskCount: m.workspace._count.tasks,
  }));

  return NextResponse.json(workspaces);
}

// POST /api/workspaces — create a new workspace
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, hackathonName, theme, startTime, endTime } = body;

  if (!name?.trim() || !hackathonName?.trim() || !startTime || !endTime) {
    return NextResponse.json(
      { error: "Name, hackathon name, start time, and end time are required" },
      { status: 400 }
    );
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (end <= start) {
    return NextResponse.json(
      { error: "End time must be after start time" },
      { status: 400 }
    );
  }

  const inviteCode = crypto.randomBytes(6).toString("hex");

  const workspace = await db.workspace.create({
    data: {
      name: name.trim(),
      hackathonName: hackathonName.trim(),
      theme: theme?.trim() || null,
      startTime: start,
      endTime: end,
      ownerId: session.user.id,
      inviteCode,
      members: {
        create: {
          userId: session.user.id,
          role: "OWNER",
          skills: [],
        },
      },
    },
  });

  return NextResponse.json(workspace, { status: 201 });
}
